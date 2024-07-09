import { httpStatusCodes } from "./HttpStatusCodes.js";
import { BaseError } from "./BaseError.js";
class UnauthorizedError extends BaseError {
  constructor(
    name = "unauthorized",
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = "Unauthorized."
  ) {
    super(name, statusCode, description);
  }
}
export { UnauthorizedError };
