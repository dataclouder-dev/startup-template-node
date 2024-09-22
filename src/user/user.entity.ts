import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export interface IUser {
  id: string;
  urlPicture: string;
  email: string;
}

@Schema({ collection: 'users' })
export class UserEntity extends Document implements IUser {
  @Prop()
  id: string;

  @Prop()
  urlPicture: string;

  @Prop()
  email: string;
}


export const UserSchema = SchemaFactory.createForClass(UserEntity);
