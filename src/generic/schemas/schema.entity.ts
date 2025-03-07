import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { addIdAfterSave } from '@dataclouder/dc-mongo';
import { IGeneric } from '../models/generic.models';
export type NewComponentDocument = NewComponentEntity & Document;

@Schema({ collection: 'generic', timestamps: true })
export class NewComponentEntity implements IGeneric {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  img: string;
}

export const NewComponentSchema = SchemaFactory.createForClass(NewComponentEntity);

addIdAfterSave(NewComponentSchema);
