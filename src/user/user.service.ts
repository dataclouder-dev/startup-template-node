import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import { Model } from 'mongoose';
import { FirebaseService } from '../common/firebase.service';
import { AppAuthClaims, IUser, PermissionClaim, PlanType, RolClaim } from './user.class';
import { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private firebaseService: FirebaseService
  ) {}

  public async findUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email }).lean();
    return user;
  }

  public async findUserById(id: string): Promise<Partial<IUser>> {
    const user = await this.userModel.findOne({ id: id }).lean().exec();
    return user;
  }

  public async registerWithToken(token: DecodedIdToken): Promise<any> {
    const claims: AppAuthClaims = { plan: { type: PlanType.Basic }, permissions: {} as PermissionClaim, roles: {} as RolClaim };

    const user: Partial<IUser> = {
      id: token.uid,
      email: token.email,
      urlPicture: token.picture ?? '',

      personalData: {
        firstname: token.name ?? token.email.split('@')[0],
      },

      authStrategy: token.firebase.sign_in_provider,
    };

    // TODO: se envia desde el frontend, solo necesito modificar las notificaciones del usuario.
    if (!token.email_verified) {
      // TODO:  send email verification
    }

    const newUser = new this.userModel(user);
    const userSaved = await newUser.save();
    this.firebaseService.setClaims(userSaved.id, claims);
    // this.userMetadataService.createUserMetadata(userSaved);

    // const data = { email: userSaved.email, name: userSaved.personalData.firstname, plan: PlanType.Basic, source: 'signup' };
    // this.notifierService.notifyUserPlan(data);

    return userSaved;
  }
}
