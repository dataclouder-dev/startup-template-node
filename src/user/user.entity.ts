import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IConversationSettings, IUser, PersonalData, UserSettings } from './user.class';
import { AppAuthClaims } from 'src/dc-claims-module/clams.class';
import { AudioSpeed } from '@dataclouder/nest-auth';

@Schema({ collection: 'users' })
export class UserEntity extends Document implements IUser {
  @Prop()
  id: string = '';

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  urlPicture: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  authStrategy: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  claims: AppAuthClaims;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  personalData: PersonalData;

  @Prop({
    default: {
      baseLanguage: 'es',
      targetLanguage: 'en',
      audioSpeed: AudioSpeed.Regular,
      enableNotifications: true,
      wordsNumber: 3,
      conversation: {
        synthVoice: true,
        realTime: false,
        repeatRecording: false,
        fixGrammar: false,
        superHearing: false,
        autoTranslate: true,
        highlightWords: false,
        assistantMessageTask: true,
        userMessageTask: true,
      },
    },
  })
  settings: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
