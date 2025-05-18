import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericEntity, GenericDocument } from '../schemas/generic.schema';
import { CreateGenericDto, IGeneric, UpdateGenericDto } from '../models/generic.models';
import { FiltersConfig, findAllObjectsWithPaths, flattenObject, IQueryResponse, MongoService } from '@dataclouder/nest-mongo';
import { CloudStorageService } from '@dataclouder/nest-google-cloud';

/**
 * Service for managing generic entities in the database
 * Provides CRUD operations and query capabilities for GenericEntity objects
 */
@Injectable()
export class GenericService {
  constructor(
    @InjectModel(GenericEntity.name)
    private genericModel: Model<GenericDocument>,
    private mongoService: MongoService,
    private cloudStorageService: CloudStorageService
  ) {}

  /**
   * Creates a new generic entity in the database
   * @param createGenericDto - The data transfer object containing entity properties
   * @returns A promise that resolves to the newly created entity
   */
  async create(createGenericDto: CreateGenericDto): Promise<GenericEntity> {
    const createdGeneric = new this.genericModel(createGenericDto);
    return await createdGeneric.save();
  }

  /**
   * Saves a generic entity to the database
   * If the entity has an ID, it updates the existing entity
   * If no ID is present, it creates a new entity
   * @param generic - The generic entity to save
   * @returns A promise that resolves to the saved entity
   */
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

  /**
   * Queries the database using a filters configuration
   * @param filterConfig - Configuration object for filtering, sorting, and pagination
   * @returns A promise that resolves to a query response containing results and metadata
   */
  async queryUsingFiltersConfig(filterConfig: FiltersConfig): Promise<IQueryResponse<GenericEntity>> {
    return await this.mongoService.queryUsingFiltersConfig(filterConfig, this.genericModel);
  }

  /**
   * Retrieves all generic entities from the database
   * @returns A promise that resolves to an array of all generic entities
   */
  async findAll(): Promise<GenericEntity[]> {
    return await this.genericModel.find().exec();
  }

  /**
   * Finds a single generic entity by its ID
   * @param id - The unique identifier of the entity to find
   * @returns A promise that resolves to the found entity or null if not found
   */
  async findOne(id: string): Promise<GenericEntity> {
    return await this.genericModel.findById(id).exec();
  }

  /**
   * Updates a generic entity with new data
   * @param id - The unique identifier of the entity to update
   * @param genericUpdates - The updated entity data
   * @returns A promise that resolves to the updated entity
   */
  async update(id: string, genericUpdates: IGeneric): Promise<GenericEntity> {
    // by default update only updates what is present in updateObject so not overriding exisiting properties unless you pass them, if you pass with null also override
    return await this.genericModel.findByIdAndUpdate(id, genericUpdates, { new: true }).exec();
  }

  /**
   * Updates only the properties that are present in the update object
   * @param id The ID of the entity to update
   * @param partialUpdates Object containing only the properties to update
   * @returns The updated entity
   */
  async partialUpdate(id: string, partialUpdates: Partial<IGeneric>): Promise<GenericEntity> {
    // Convert nested objects to dot notation eg. { "video.captions.remotion": captions.captions }
    // This way you can only remove properties that are present in the update object
    const flattenedUpdates = flattenObject(partialUpdates);
    return await this.genericModel.findByIdAndUpdate(id, { $set: flattenedUpdates }, { new: true }).exec();
  }

  /**
   * Removes a generic entity from the database
   * @param id - The unique identifier of the entity to remove
   * @returns A promise that resolves when the entity has been removed
   */
  async remove(id: string): Promise<void> {
    const obj = await this.genericModel.findByIdAndDelete(id).exec();
    // Note this part is important if you have storage files you want to delete.
    const pathsObjects = findAllObjectsWithPaths(obj);
    const promises = pathsObjects.map(obj => this.cloudStorageService.deleteStorageFile(obj.bucket, obj.path));
    await Promise.all(promises);
  }
}
