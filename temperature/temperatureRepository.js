import TemperatureCurrent from "./temperatureCurrentModel.js";
import Temperature from "./temperatureModel.js";

const prettyPrintWeatherCode = (code) => {
  const weatherCodes = {
    0: "Unknown",
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  };
  return weatherCodes[code.toString()];
};

const prettyPrintPrecipitationTypeCode = (code) => {
  const precipitationTypeCode = {
    0: "Normal",
    1: "Rain",
    2: "Snow",
    3: "Freezing Rain",
    4: "Ice Pellets / Sleet",
  };
  return precipitationTypeCode[code.toString()];
};

const GetCurrent = async (dist) => {
  let list = await TemperatureCurrent.findAll({
    attributes: ["temperature", "weatherCode", "precipitationType"],
    where: {
      dist: dist,
    },
    order: [["dist", "DESC"]],
    limit: 1,
    raw: true,
  });

  list.forEach((ele) => {
    ele.weatherCode = prettyPrintWeatherCode(ele.weatherCode);
    ele.precipitationType = prettyPrintPrecipitationTypeCode(ele.precipitationType);
  });

  return list ? list[0] : null;
};

const GetList = async () => {
  let list = await Temperature.findAll({
    attributes: ["year", "circle", "january"],
    raw: true,
  });
  return list ? list : null;
};

// await Grade.findAll({
//   attributes: ['student_id', 'subject_id', 'grade', [Sequelize.fn('max', Sequelize.col('date')), 'date']],
//   raw: true,
//   group: ['student_id', 'subject_id']
// })

// await Grade.findAll({
//   attributes: [Sequelize.literal('DISTINCT ON ("student_id", "subject_id") *'),
//   'id', 'student_id', 'subject_id', 'date', 'grade'],
//   order: ['student_id', 'subject_id', ['date', 'DESC']]
// })

export { GetList, GetCurrent };
