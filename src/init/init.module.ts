
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { InitController } from './init.controller';

@Module({
  imports: [UserModule],
  controllers: [InitController],
})
export class InitModule {}
