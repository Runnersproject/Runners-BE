import bcrypt from "bcrypt";
const db = require("../../models");

const User = db.users;

export const register = async (email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  return user;
};
