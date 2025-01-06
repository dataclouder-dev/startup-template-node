import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AppAuthClaims, IUser, PersonalData } from './user.class';

@Schema({ collection: 'users' })
export class UserEntity extends Document implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, auto: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  urlPicture: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  authStrategy: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  claims: AppAuthClaims;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  personalData: PersonalData;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
