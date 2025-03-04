import { Body, Controller, Param, Get, Post, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewComponentService } from '../newComponent.service';
import { CreateNewComponentDto, UpdateNewComponentDto } from '../models/newComponent.models';
import { NewComponentEntity } from '../schema.entity';
import { FiltersConfig, IQueryResponse } from '@dataclouder/dc-mongo';

@ApiTags('newComponent')
@Controller('api/newComponents')
export class NewComponentController {
  constructor(private readonly newComponentService: NewComponentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all newComponent items' })
  @ApiResponse({ status: 200, description: 'Return all newComponent items.', type: [NewComponentEntity] })
  async findAll(): Promise<NewComponentEntity[]> {
    return await this.newComponentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a newComponent item by id' })
  @ApiResponse({ status: 200, description: 'Return the newComponent item.', type: NewComponentEntity })
  async findOne(@Param('id') id: string): Promise<NewComponentEntity> {
    return await this.newComponentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new newComponent item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.', type: NewComponentEntity })
  async create(@Body() createNewComponentDto: CreateNewComponentDto): Promise<NewComponentEntity> {
    return await this.newComponentService.create(createNewComponentDto);
  }

  @Post('query')
  @ApiOperation({ summary: 'Create a new newComponent item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.', type: NewComponentEntity })
  async query(@Body() filterConfig: FiltersConfig): Promise<IQueryResponse> {
    return await this.newComponentService.queryUsingFiltersConfig(filterConfig);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a newComponent item' })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.', type: NewComponentEntity })
  async update(@Param('id') id: string, @Body() updateNewComponentDto: UpdateNewComponentDto): Promise<NewComponentEntity> {
    return await this.newComponentService.update(id, updateNewComponentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a newComponent item' })
  @ApiResponse({ status: 204, description: 'The item has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.newComponentService.remove(id);
  }
}
