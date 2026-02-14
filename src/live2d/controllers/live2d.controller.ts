import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Live2dService } from '../services/live2d.service';

import { EntityController } from '@dataclouder/nest-mongo';
import { Live2dDocument } from '../schemas/live2d.schema';

@ApiTags('live2d')
@Controller('api/live2d') // NOT ENDPOINT Father will tell
export class Live2dController extends EntityController<Live2dDocument> {
  constructor(private readonly live2dService: Live2dService) {
    super(live2dService);
  }
}
