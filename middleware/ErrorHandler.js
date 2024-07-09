import { InternalServerError } from "./InternalServerError.js";
const logError = (err) => {
  console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

const returnError = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send(err.statusCode ? err : new InternalServerError(err.message));
};
export { logError, logErrorMiddleware, returnError };
