import { Body, Controller, Delete, Get, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import { Model } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/common/token.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AppUserService } from './user.service';
import { AppHttpCode } from 'src/common/app-enums';
import { IUser } from './user.class';
import { AllExceptionsHandler } from 'src/common/exception-hanlder.filter';
import { AuthGuard } from '@dataclouder/nest-auth';
import { AppGuard, EntityController } from '@dataclouder/nest-core';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AppGuard, AuthGuard)
@Controller('api/user')
@UseFilters(AllExceptionsHandler)
export class UserController extends EntityController<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private userService: AppUserService
  ) {
    super(userService);
  }

  // This is replace by the one in init.controller
  @Get('/logged')
  async getLoggedUserDataOrRegister(@DecodedToken() token: DecodedIdToken, @Res({ passthrough: true }) res): Promise<any> {
    console.log('Getting user Data', token.uid);
    const user = await this.userService.findUserById(token.uid);

    if (user) {
      return user;
    } else {
      res.status(AppHttpCode.GoodRefreshToken);
      const user = await this.userService.registerWithToken(token);
      return user;
    }
  }

  // This is replace by the one in init.controller
}
