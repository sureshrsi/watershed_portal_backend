import { default as fetch } from "node-fetch";
import { default as cron } from "node-cron";
import { default as pg } from "pg";
import { default as sql } from "sql";
import { dbString } from "../db/db.js";
import { GetDistList } from "../districts/districtsRepository.js";

const API_KEY = "Xw1fiUbiRuepIb6RFFqTjaoQWhQOE1PR"; //tomorrow.io api key
const locations = [
  {
    name: "Itanagar",
    coordinates: "27.0844,93.6053",
  },
];

/**
 * main function for monitoring the required locations.
 */
async function monitorTemperature() {
  console.log(
    `Starting ${
      locations.length
    } locations monitoring - ${new Date().toISOString()}`
  );

  const list = await GetDistList();
  list.forEach((ele) => {
    locations.push({
      name: ele.value,
      coordinates: ele.lat + "," + ele.long,
    });
  });

  locations.forEach((location) => {
    setTimeout(() => {
      fetchTemperature(location, "30m").then((rowsObj) => {
        saveData(rowsObj, "temperature_30m");
      });
      fetchTemperature(location, "current").then((rowsObj) => {
        saveData(rowsObj, "temperature_current");
      });
    }, 1000);
  });
  console.log(`Will run again in 30 minutes`);
}

/**
 * Monitor the given location, will send an alert if the differece between the next interval is more that 2°C
 */
async function fetchTemperature(location, step) {
  const startTime = new Date();
  const endTime = new Date();
  endTime.setHours(startTime.getHours() + 1);

  console.log(`Getting temperture for ${location.name}`);

  const fields = [
    "precipitationType",
    "snowIntensity",
    "rainIntensity",
    "temperature",
    "temperatureApparent",
    "humidity",
    "windSpeed",
    "visibility",
    "weatherCode",
    "cloudCover",
  ];

  // API Call for fetching the given location's forecast
  const res = await fetch(
    `https://api.tomorrow.io/v4/timelines?location=${
      location.coordinates
    }&fields=${fields.join(
      ","
    )}&timesteps=${step}&units=metric&apikey=${API_KEY}&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
  );
  const tempertureResponse = await res.json();

  const currentTemperture =
    tempertureResponse?.data?.timelines[0]?.intervals[0]?.values?.temperature;

  let tempObj = [];

  tempertureResponse?.data?.timelines?.forEach((temp) => {
    let localObj = {};
    localObj["dist"] = location.name;
    localObj["coordinates"] = location.coordinates;
    localObj["startTime"] = temp?.startTime;
    localObj["endTime"] = temp?.endTime;
    localObj["currentTemperture"] = currentTemperture;
    temp?.intervals.forEach((obj, index) => {
      localObj["intervalStartTime"] = obj?.startTime;
      if (step != "current") {
        // ignore these columns for current temperature table
        if (temp?.intervals.length != index + 1) {
          const nextIntervalTemperture =
            tempertureResponse?.data?.timelines[0]?.intervals[index + 1]?.values
              ?.temperature;
          const nextIntervalStartTime =
            tempertureResponse?.data?.timelines[0]?.intervals[index + 1]
              ?.startTime;
          localObj["nextIntervalTemperture"] = nextIntervalTemperture;
          localObj["nextIntervalStartTime"] = nextIntervalStartTime;
        } else {
          localObj["nextIntervalTemperture"] = null;
          localObj["nextIntervalStartTime"] = null;
        }
      }
      fields.forEach((field) => {
        localObj[field] = obj?.values[field];
      });

      tempObj.push(localObj);
    });
  });

  console.log(`Succseffully got temperture for ${location.name}`);

  return tempObj;
}

async function saveData(rowsObj, tableName) {
  //Temperature
  let columnsList = [
    "cloudCover",
    "coordinates",
    "currentTemperture",
    "dist",
    "endTime",
    "humidity",
    "intervalStartTime",
    "precipitationType",
    "rainIntensity",
    "snowIntensity",
    "startTime",
    "temperature",
    "temperatureApparent",
    "visibility",
    "weatherCode",
    "windSpeed",
  ];

  if (tableName != "temperature_current") {
    // ignore these columns for current temperature table
    columnsList = columnsList.concat([
      "nextIntervalStartTime",
      "nextIntervalTemperture",
    ]);
  }

  let Temperature = sql.define({
    name: tableName,
    columns: columnsList,
  });

  // console.log(JSON.stringify(rowsObj))

  let insertQuery = Temperature.insert(rowsObj).toQuery();

  let client = new pg.Client({ connectionString: dbString });
  await client.connect();

  client
    .query(insertQuery)
    .then((result) => {
      console.log(`Succseffully temperature records inserted.`);
    })
    .catch((error) => console.log(error));
}

//testing
// export default monitorTemperature;

/**
 * Main monitoring runner, will run every 30 minutes.
 */
// cron.schedule("* * * * *", () => {
//   monitorTemperature();
// });

//In order to run this script 24/7 We will use a process manager like PM2 in order to make sure that even if the script crash's,
//it will start itself.
