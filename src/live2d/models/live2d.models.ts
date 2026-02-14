import { IAuditable } from '@dataclouder/nest-core';

export interface ILive2d {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  content?: string;
  image?: string;
  auditable?: IAuditable;
}
