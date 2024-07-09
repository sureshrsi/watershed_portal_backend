import { httpStatusCodes } from "./HttpStatusCodes.js";
import { BaseError } from "./BaseError.js";
class InternalServerError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = "There has been an internal error."
  ) {
    //console.log(description);
    super(name, statusCode, description);
  }
}
export { InternalServerError };
