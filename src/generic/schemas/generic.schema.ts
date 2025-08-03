import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { addIdAfterSave } from '@dataclouder/nest-mongo';
import { IGeneric } from '../models/generic.models';
import { IAuditable } from '@dataclouder/nest-core';
export type GenericDocument = GenericEntity & Document;

@Schema({ collection: 'generic', timestamps: true })
export class GenericEntity implements IGeneric {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  id: string;
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  img: string;

  // TODO i need to update this automatically check in polilan for agent cards and lessons.
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  auditable: IAuditable;
}

export const GenericSchema = SchemaFactory.createForClass(GenericEntity);

addIdAfterSave(GenericSchema);
