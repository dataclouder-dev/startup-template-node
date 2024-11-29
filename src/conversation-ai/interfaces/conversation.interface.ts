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



export enum ConversationType {
  LearningExample = 'learningExample',
  Scenario = 'scenario',
  WordReflection = 'wordReflection',
  Lesson = 'lesson',
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

