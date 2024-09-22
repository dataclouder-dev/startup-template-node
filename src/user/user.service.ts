import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import { Model } from 'mongoose';

export class UserService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}
}
