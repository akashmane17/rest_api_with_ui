import {
  getModelForClass,
  modelOptions,
  prop,
  pre,
  DocumentType,
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import config from 'config';
import log from '../utils/logger';

/**
 * pre save hook to hash our password using brcypt
 */
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return;
})

// Adding timestamps to our model
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

/**
 * Class user
 * contains email, name, password
 * comparePassword funtion to compare input pass with pass in db
 */
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  password: string;

  // for login purpose
  // compare entered password with hashPass and return true or false
  async comparePassword(
    this: DocumentType<User>,
    candidatePassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
      log.error(e, 'Could not validate password');
      return false;
    }
  }
}

// Createing model using class
const UserModel = getModelForClass(User);

// exporting UserModel
export default UserModel;
