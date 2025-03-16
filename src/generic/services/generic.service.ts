import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericEntity, GenericDocument } from '../schemas/generic.schema';
import { CreateGenericDto, IGeneric, UpdateGenericDto } from '../models/generic.models';
import { FiltersConfig, IQueryResponse, MongoService } from '@dataclouder/nest-mongo';

@Injectable()
export class GenericService {
  constructor(
    @InjectModel(GenericEntity.name)
    private genericModel: Model<GenericDocument>,
    private mongoService: MongoService
  ) {}

  async create(createGenericDto: CreateGenericDto): Promise<GenericEntity> {
    const createdGeneric = new this.genericModel(createGenericDto);
    return await createdGeneric.save();
  }

  async save(generic: IGeneric) {
    // TODO: test not sure if this is correct
    const id = generic.id || generic._id;
    if (id) {
      return this.update(id, generic);
    } else {
      delete generic._id;
      delete generic.id;
      const createdTask = new this.genericModel(generic);
      return createdTask.save();
    }
  }

  async queryUsingFiltersConfig(filterConfig: FiltersConfig): Promise<IQueryResponse> {
    return await this.mongoService.queryUsingFiltersConfig(filterConfig, this.genericModel);
  }

  async findAll(): Promise<GenericEntity[]> {
    return await this.genericModel.find().exec();
  }

  async findOne(id: string): Promise<GenericEntity> {
    return await this.genericModel.findById(id).exec();
  }

  async update(id: string, genericUpdates: IGeneric): Promise<GenericEntity> {
    return await this.genericModel.findByIdAndUpdate(id, genericUpdates, { new: true }).exec();
  }

  /**
   * Updates only the properties that are present in the update object
   * @param id The ID of the entity to update
   * @param partialUpdates Object containing only the properties to update
   * @returns The updated entity
   */
  async partialUpdate(id: string, partialUpdates: Partial<IGeneric>): Promise<GenericEntity> {
    // Use $set operator to only update the fields provided in partialUpdates
    return await this.genericModel.findByIdAndUpdate(id, { $set: partialUpdates }, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.genericModel.findByIdAndDelete(id).exec();
  }
}
