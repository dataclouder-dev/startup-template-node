import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { addIdAfterSave } from '@dataclouder/nest-mongo';
import { ILive2d } from '../models/live2d.models';
import { AuditDataSchema, IAuditable } from '@dataclouder/nest-core';
export type Live2dDocument = Live2dEntity & Document;

@Schema({ collection: 'live2d', timestamps: true })
export class Live2dEntity implements ILive2d {
  @Prop({ required: false })
  id: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false, type: Object })
  files: any;

  @Prop({ required: false, type: Object })
  image: any;

  @Prop({ type: AuditDataSchema, required: false, default: {} })
  auditable: IAuditable;
}

export const Live2dSchema = SchemaFactory.createForClass(Live2dEntity);

addIdAfterSave(Live2dSchema);

Live2dSchema.index({ id: 1 }, { unique: true });
