import User from "./userModel.js";

const SaveUser = async (user) => {
  let userSave = User.build(user);
  await User.sync({ force: false });
  return await userSave.save();
  console.log("saved user ", user);
};
const RetrieveUserByUsername = async (username) => {
  let users = await User.findAll({ where: { username } });
  return users[0] ? users[0] : null;
};
export { SaveUser, RetrieveUserByUsername };
