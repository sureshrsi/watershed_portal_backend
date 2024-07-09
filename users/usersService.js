import { SaveUser, RetrieveUserByUsername } from "./usersRepository.js";
import bcrypt from "bcrypt";
import { issueToken } from "../security/index.js";
import { UnauthorizedError } from "../middleware/UnauthorizedError.js";

const Register = async (user) => {
  console.log(`user`, user);
  user.password = await bcrypt.hash(user.password, 10);
  let saved = await SaveUser(user);
  console.info("finished saving user");

  return issueToken(saved);
};
const Login = async (username, password) => {
  const user = await RetrieveUserByUsername(username);
  const match = await bcrypt.compare(password, user.password);
  if (user && match) {
    return issueToken(user);
  }
  throw new UnauthorizedError();
};
export { Register, Login };
