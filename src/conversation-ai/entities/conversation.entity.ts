import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConversationType, TextEngines, IConversationCard, CharacterCardDC } from '../clases/conversation.interface';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation implements IConversationCard {
  @Prop({ required: false })
  version: string;

  @Prop({ required: false })
  id: string;

  @Prop({ required: false })
  title: string;

  @Prop({ type: Object, required: false })
  characterCard: CharacterCardDC;

  @Prop({ required: true, enum: TextEngines })
  textEngine: TextEngines;

  @Prop({ required: true, enum: ConversationType })
  conversationType: ConversationType;

  @Prop({ required: false })
  lang: string;

  @Prop({ type: Object, required: false })
  assets: {
    image: any;
  };

  @Prop({ type: Object, required: false })
  tts: {
    voice: string;
    secondaryVoice: string;
    speed: string;
    speedRate: number;
  };

  @Prop({ required: false })
  voice: string;

  @Prop({ required: false })
  secondaryVoice: string;

  @Prop({ required: false })
  speed: string;

  @Prop({ required: false })
  speedRate: number;

  @Prop({ type: Object, required: false })
  metaApp: {
    isPublished: boolean;
    isPublic: boolean;
    authorId: string;
    authorEmail: string;
    createdAt: Date;
    updatedAt: Date;
    takenCount: number;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
