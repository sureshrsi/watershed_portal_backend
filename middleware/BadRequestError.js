import { httpStatusCodes } from "./HttpStatusCodes.js";
import { BaseError } from "./BaseError.js";
class BadRequestError extends BaseError {
  constructor(name, description, statusCode = httpStatusCodes.BAD_REQUEST) {
    super(name, statusCode, description);
  }
}
export { BadRequestError };
