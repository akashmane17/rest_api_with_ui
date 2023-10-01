import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

/**
 * class for Session
 * contains user, valid, userAgent variables
 */
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;

  @prop()
  userAgent: string;
}

// Adding schemaOptions of timestamps and creating model for our class Session
const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

// exporting sessionModel
export default SessionModel;
