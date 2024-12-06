// import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage, ConversationType } from '../clases/conversation.interface';

export class CreateConversationDto {
  @ApiProperty({
    description: 'The message content of the conversation',
    example: 'Hello, how can I help you today?',
  })
  message: string;

  @ApiProperty({
    description: 'The user ID associated with the conversation',
    example: 'user123',
  })
  userId: string;

  @ApiProperty({
    description: 'Additional context for the conversation',
    required: false,
    example: { previousContext: 'User asked about weather' },
  })
  context?: Record<string, any>;
}

export class ConversationDTO {
  id?: string;
  entityId?: string; // LearningExample or Scenario id
  type?: ConversationType;
  createdAt?: Date;
  messages: Array<ChatMessage>;
  transcription?: boolean;
  modelName?: string;
  provider?: string;
  returnJson?: boolean;
}
