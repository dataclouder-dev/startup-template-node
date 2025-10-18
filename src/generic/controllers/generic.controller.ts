import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericService } from '../services/generic.service';

import { EntityController } from '@dataclouder/nest-mongo';
import { GenericDocument } from '../schemas/generic.schema';

@ApiTags('generic')
@Controller('api/generic') // NOT ENDPOINT Father will tell
export class GenericController extends EntityController<GenericDocument> {
  constructor(private readonly genericService: GenericService) {
    super(genericService);
  }
}
