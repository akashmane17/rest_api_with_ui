import { omit } from "lodash";
import UserModel, { User } from "../models/user.model";
import { FilterQuery } from "mongoose";

export async function createUser(input: Partial<User>) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password", "__v");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // find user by email
  const user = await UserModel.findOne({ email });

  // user does not exist
  if (!user) return false;

  // compare password
  const isValid = await user.comparePassword(password);

  // password is not valid
  if (!isValid) return false;

  // user exist and password is valid
  return omit(user.toJSON(), "password", "__v");
}

export async function findUser(query: FilterQuery<User>) {
  return UserModel.findOne(query).lean;
}
