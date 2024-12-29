export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  messages?: Message[];
  userId: string;
  context?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum ChatRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
  AssistantHelper = 'assistantHelper',
}

export class ChatMultiMessage {
  voice: string;
  content: string;
  text: string;
  audioUrl: string;
  audioPromise: any;
  isLoading?: boolean;
  transcription?: any;
  transcriptionTimestamps?: WordTimestamps[];
  tag: string | string[] | Set<string> | { [klass: string]: any };
}

export type TranscriptionsWhisper = { text: string; task: string; language: string; words: any; duration: number };

export class WordTimestamps {
  word: string;
  start: number;
  end: number;
  highlighted: any;
}

export class ChatMessageDict {
  content: string;
  role: ChatRole;
  metadata?: any;
}

export class ChatMessage {
  content: string; // Contenido del mensaje en el formato que venga.
  role: ChatRole; // Assistant | User
  ssml?: string;
  text?: string; // extraccion simple sin formato
  translation?: string;
  audioUrl?: string;
  audioHtml?: HTMLAudioElement; // this is to get a reference to node so i can subscribe to events
  promisePlay?: any; // promise to play the audio
  stats?: any;
  multiMessages?: ChatMultiMessage[]; //
  transcription?: TranscriptionsWhisper; // data i got from whisper
  transcriptionTimestamps?: WordTimestamps[]; // array of words with start and end time
  voice?: string;
}

export interface CharaCard {
  name: string;
  description: string;
  scenario: string;
  first_mes: string;
  creator_notes: string;
  mes_example: string;
  alternate_greetings: string[];
  tags: string[];
  system_prompt: string;
  post_history_instructions: string;
}

export interface Appearance {
  physicalDescription: string; // height, build, hairColor, hairStyle, eyeColor, skinTone,
  outfit: string; // clothing style, currentOutfit
  objects: string;
  quirks: string; //distinctiveMarks
}

export interface CharacterCardDC {
  spec: 'chara_card_v2';
  spec_version: '2_v_dc';
  data: {
    name: string;
    description: string;
    // personality: string; not needed
    scenario: string;
    first_mes: string;
    creator_notes: string;
    mes_example: string;
    alternate_greetings: string[];
    tags: string[];
    system_prompt: string;
    post_history_instructions: string;
    character_version: string;
    extensions: Record<string, any>;
    appearance: Appearance;
  };
}

export enum TextEngines {
  Plantext = 'plantext',
  SimpleText = 'simpleText',
  MarkdownMultiMessages = 'markdownMultiMessages',
  MarkdownSSML = 'markdownSSML',
}

export enum ConversationType {
  General = 'general',
  Reflection = 'reflection',
  LearningExample = 'learningExample',
  Challenge = 'challenge',
}

export interface IConversation {
  isPublic: any;
  _id: any;
  id: string;
  card: CharacterCardDC;
  title: string;
  image: any;
  voice: string;
  secondaryVoice: string;
  isPublished: boolean;
  authorId: string;
  authorEmail: string;
  takenCount: number;
  lang: string;
  textEngine: TextEngines;
  ConversationType: ConversationType;
}

export interface IConversationCard {
  version: string;
  id: string;
  title: string;

  assets: {
    image: any;
  };
  characterCard: CharacterCardDC;

  textEngine: TextEngines;
  conversationType: ConversationType;
  lang: string;

  tts: {
    voice: string;
    secondaryVoice: string;
    speed: string;
    speedRate: number;
  };

  metaApp: {
    isPublished: boolean;
    isPublic: any;
    authorId: string;
    authorEmail: string;
    createdAt: Date;
    updatedAt: Date;
    takenCount: number;
  };
}
