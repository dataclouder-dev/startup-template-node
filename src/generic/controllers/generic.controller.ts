import { Body, Controller, Param, Get, Post, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericService } from '../services/generic.service';
import { CreateGenericDto, IGeneric, UpdateGenericDto } from '../models/generic.models';
import { GenericEntity } from '../schemas/generic.schema';
import { FiltersConfig, IQueryResponse } from 'libs/nest-mongo/src';

/**
 * Controller for handling HTTP requests related to generic entities
 * Provides REST API endpoints for CRUD operations on generic entities
 */
@ApiTags('generic')
@Controller('api/generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  /**
   * Retrieves all generic entities
   * @returns Promise resolving to an array of all generic entities
   */
  @Get()
  @ApiOperation({ summary: 'Get all newComponent items' })
  @ApiResponse({ status: 200, description: 'Return all newComponent items.', type: [GenericEntity] })
  async findAll(): Promise<GenericEntity[]> {
    return await this.genericService.findAll();
  }

  /**
   * Retrieves a single generic entity by its ID
   * @param id - The unique identifier of the entity to retrieve
   * @returns Promise resolving to the found entity
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a newComponent item by id' })
  @ApiResponse({ status: 200, description: 'Return the newComponent item.', type: GenericEntity })
  async findOne(@Param('id') id: string): Promise<GenericEntity> {
    return await this.genericService.findOne(id);
  }

  /**
   * Creates a new generic entity
   * @param createGenericDto - The data for creating a new entity
   * @returns Promise resolving to the newly created entity
   */
  @Post()
  @ApiOperation({ summary: 'Create a new newComponent item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.', type: GenericEntity })
  async create(@Body() createGenericDto: IGeneric): Promise<GenericEntity> {
    return await this.genericService.save(createGenericDto);
  }

  /**
   * Queries generic entities using a filter configuration
   * @param filterConfig - Configuration for filtering, sorting, and pagination
   * @returns Promise resolving to query results and metadata
   */
  @Post('query')
  @ApiOperation({ summary: 'Create a new newComponent item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.', type: GenericEntity })
  async query(@Body() filterConfig: FiltersConfig): Promise<IQueryResponse> {
    return await this.genericService.queryUsingFiltersConfig(filterConfig);
  }

  /**
   * Updates a generic entity with partial data
   * @param id - The unique identifier of the entity to update
   * @param partialUpdates - Object containing the properties to update
   * @returns Promise resolving to the updated entity
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a newComponent item' })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.', type: GenericEntity })
  async update(@Param('id') id: string, @Body() partialUpdates: Partial<IGeneric>): Promise<GenericEntity> {
    return await this.genericService.partialUpdate(id, partialUpdates);
  }

  /**
   * Removes a generic entity from the database
   * @param id - The unique identifier of the entity to remove
   * @returns Promise resolving when the entity has been removed
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a newComponent item' })
  @ApiResponse({ status: 204, description: 'The item has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.genericService.remove(id);
  }
}
