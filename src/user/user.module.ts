import { Module, forwardRef } from '@nestjs/common'; // Import forwardRef
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { FirebaseService } from '../common/firebase.service'; // Removed local import
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import config from '../config/environment';
import { NestAuthModule } from '@dataclouder/nest-auth'; // Added import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    HttpModule,
    ConfigModule.forFeature(config),
    NestAuthModule,
  ],
  controllers: [UserController],
  providers: [UserService], // Removed FirebaseService
  exports: [UserService], // Removed FirebaseService
})
export class UserModule {}
