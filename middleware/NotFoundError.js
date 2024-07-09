import { httpStatusCodes } from "./HttpStatusCodes.js";
import { BaseError } from "./BaseError.js";
class NotFountError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found."
  ) {
    super(name, statusCode, description);
  }
}
export { NotFountError };
