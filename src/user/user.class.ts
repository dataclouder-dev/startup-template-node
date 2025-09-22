import { AppAuthClaims } from 'src/dc-claims-module/clams.class';

export class PersonalData {
  firstname: string;
  lastname: string;
  nickname: string;
  gender: string;
  birthday: Date;
}

export interface IUser {
  _id?: any;
  id?: string;
  urlPicture: string;
  email: string;
  personalData: Partial<PersonalData>;
  claims: AppAuthClaims;
  authStrategy: string;
  settings: UserSettings;
}

export interface IConversationSettings {
  realTime: boolean;
  repeatRecording: boolean;
  fixGrammar: boolean;
  superHearing: boolean;
  voice: string;
  autoTranslate: boolean;
  highlightWords: boolean;
  modelName: string;
  provider: string;
  speed: string;
  speedRate: number; // Temporal only 0 to 100.
}

export class UserSettings {
  baseLanguage: string;
  targetLanguage: string;
  enableNotifications: boolean;
  wordsNumber: number;
  conversation: IConversationSettings;
}
