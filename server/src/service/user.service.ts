import { omit } from 'lodash';
import UserModel, { User } from '../models/user.model';
import { FilterQuery } from 'mongoose';

/**
 * createUser
 * @param input object of type User
 * @returns newly created user
 */
export async function createUser(input: Partial<User>) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password', '__v');
  } catch (e: any) {
    throw new Error(e);
  }
}

/**
 * validatePassword
 * @param param0 object containing email and pass
 * @returns false if user is not present or password is not valid else returns userdata as json
 */
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
  return omit(user.toJSON(), 'password', '__v');
}

/**
 * findUser find user by given query
 * @param query query to filter user
 * @returns user found using the query
 */
export async function findUser(query: FilterQuery<User>) {
  return UserModel.findOne(query).lean;
}
