import { default as express } from "express";
import { default as cors } from "cors";
import { default as bodyParser } from "body-parser";
import { UserApi } from "./users/index.js";
import { DistrictApi } from "./districts/index.js";
import { DistrictInfoApi } from "./districts_info/index.js";
import { logError, returnError } from "./middleware/index.js";
import { TemperatureApi } from "./temperature/index.js";
// testing
// import monitorTemperature from "./tomorrow_io/fetchData.js";

const app = express();

app.use(cors({ origin: ["http://localhost:8081"] }));   
app.use(bodyParser.json());

//app.use("/api/", UserApi);
app.use("/api/", DistrictApi); // NRI Map dropdown info details
app.use("/api/", DistrictInfoApi); // SVG tooltip info details
app.use("/api/", TemperatureApi);
app.use(logError);
app.use(returnError);

//testing
// monitorTemperature();

export default app;
