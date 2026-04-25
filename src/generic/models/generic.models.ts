import { IAuditable } from '@dataclouder/nest-core';

export interface IGeneric {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  content?: string;
  image?: string;
  auditable?: IAuditable;
}
