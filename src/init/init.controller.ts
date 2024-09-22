import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AppHttpCode } from 'src/common/app-enums';
import { DecodedToken } from 'src/common/token.decorator';
import { UserService } from 'src/user/user.service';

@Controller('api/init/user')
export class InitController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getLoggedUserDataOrRegister(@DecodedToken() token: DecodedIdToken, @Res({ passthrough: true }) res): Promise<any> {
    console.log('Getting Data', token);
    // const user = await this.userService.findUserById(token.uid);
    let user: any;
    if (user) {
      if (!user.recommendations) {
        user.recommendations = {} as any;
      }
      // this.updateAllRecommendations(token.uid, user, progressData);
      return user;
    } else {
      console.log('First time registered', token);
      res.status(AppHttpCode.GoodRefreshToken);
      // const user = await this.userService.registerWithToken(token);
      return user;
    }
  }
}
