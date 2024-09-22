import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, UserEntity } from './user.entity';
import { Model } from 'mongoose';

@Controller('api/user')
export class UserController {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    // private readonly firebaseService: FirebaseService,
    // private userMetadataService: UserMetadataService,
    // private notifierService: NotifierService,
  ) {}

  public async findUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email }).lean();
    return user;
  }

  public async findUserById(id: string): Promise<Partial<IUser>> {
    const user = await this.userModel.findOne({ id: id }).lean().exec();
    return user;
  }
}
