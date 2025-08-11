import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { addIdAfterSave } from '@dataclouder/nest-mongo';
import { IGeneric } from '../models/generic.models';
import { AuditDataSchema, IAuditable } from '@dataclouder/nest-core';
export type GenericDocument = GenericEntity & Document;

@Schema({ collection: 'generic', timestamps: true })
export class GenericEntity implements IGeneric {
  @Prop({ required: false })
  id: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  img: string;

  @Prop({ type: AuditDataSchema, required: false, default: {} })
  auditable: IAuditable;
}

export const GenericSchema = SchemaFactory.createForClass(GenericEntity);

addIdAfterSave(GenericSchema);

GenericSchema.index({ id: 1 }, { unique: true });
