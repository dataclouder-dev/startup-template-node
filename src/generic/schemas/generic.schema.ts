import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { addIdAfterSave } from 'libs/nest-mongo/src';
import { IGeneric } from '../models/generic.models';
export type GenericDocument = GenericEntity & Document;

@Schema({ collection: 'generic', timestamps: true })
export class GenericEntity implements IGeneric {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  img: string;
}

export const GenericSchema = SchemaFactory.createForClass(GenericEntity);

addIdAfterSave(GenericSchema);
