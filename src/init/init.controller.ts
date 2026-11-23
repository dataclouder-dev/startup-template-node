import { AllExceptionsHandler } from '@dataclouder/nest-core';
import { Controller, Get, Param, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppHttpCode } from 'src/common/app-enums';
import { DecodedToken } from 'src/common/token.decorator';
import { AppUserService } from 'src/user/user.service';
import { NestUsersService } from '@dataclouder/nest-users';
import { AppAuthClaims, AppToken, AuthGuard, PermissionClaim, PlanType, RolClaim, RolType } from '@dataclouder/nest-auth';

@ApiTags('init')
@Controller('api/init/user')
@UseFilters(AllExceptionsHandler)
export class InitController {
  constructor(
    private userService: AppUserService,
    private usersAdminService: NestUsersService
  ) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getLoggedUserDataOrRegister(@DecodedToken() token: AppToken, @Res({ passthrough: true }) res): Promise<any> {
    console.log('Getting Data', token);
    // let user: any;

    const user = await this.userService.findUserByEmail(token.email);

    if (user) {
      return user;
    } else {
      console.log('First time registered', token.uid);
      res.status(AppHttpCode.GoodRefreshToken);
      const user = await this.userService.registerWithToken(token);
      return user;
    }
  }

  @Get('/create-first-admin/:email')
  async createFirstAdmin(@Param('email') email: string) {
    const authClaims: AppAuthClaims = {
      plan: { type: PlanType.Premium, exp: null },
      permissions: {} as PermissionClaim,
      roles: { [RolType.Admin]: null } as RolClaim,
      userId: null,
    };
    const user = await this.usersAdminService.updateClaimsByEmail(email, authClaims);
    return user;
  }
}
