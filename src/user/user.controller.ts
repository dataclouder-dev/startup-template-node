import { Controller, Get, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/common/token.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UserService } from './user.service';
import { AppHttpCode } from 'src/common/app-enums';
import { IUser } from './user.class';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private userService: UserService
    // private readonly firebaseService: FirebaseService,
    // private userMetadataService: UserMetadataService,
    // private notifierService: NotifierService,
  ) {}

  // This is replace by the one in init.controller
  @Get('/')
  async getLoggedUserDataOrRegister(@DecodedToken() token: DecodedIdToken, @Res({ passthrough: true }) res): Promise<any> {
    console.log('Getting Data', token);
    const user = await this.userService.findUserById(token.uid);

    if (user) {
      return user;
    } else {
      res.status(AppHttpCode.GoodRefreshToken);
      const user = await this.userService.registerWithToken(token);
      return user;
    }
  }

  public async findUserById(id: string): Promise<Partial<IUser>> {
    const user = await this.userModel.findOne({ id: id }).lean().exec();
    return user;
  }
}
