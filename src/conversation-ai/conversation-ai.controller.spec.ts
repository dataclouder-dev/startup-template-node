import { Test, TestingModule } from '@nestjs/testing';
import { ConversationAiController } from './conversation-ai.controller';
import { ConversationAiService } from './conversation-ai.service';
import { Conversation, ConversationDocument } from './entities/conversation.entity';
import { TextEngines } from './clases/conversation.interface';

describe('ConversationAiController', () => {
  let controller: ConversationAiController;
  let service: ConversationAiService;

  const mockConversation: Partial<Conversation> = {
    title: 'Test Conversation',
    version: '1.0',
    textEngine: TextEngines.Plantext,
  };

  const mockConversationDocument = {
    ...mockConversation,
    _id: 'someId',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as ConversationDocument;

  const mockConversationService = {
    saveConversation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationAiController],
      providers: [
        {
          provide: ConversationAiService,
          useValue: mockConversationService,
        },
      ],
    }).compile();

    controller = module.get<ConversationAiController>(ConversationAiController);
    service = module.get<ConversationAiService>(ConversationAiService);
  });

  describe('saveConversation', () => {
    it('should create a new conversation', async () => {
      mockConversationService.saveConversation.mockResolvedValue(mockConversationDocument);

      const result = await controller.saveConversation(mockConversation as Conversation);

      expect(result).toBeDefined();
      expect(result).toEqual(mockConversationDocument);
      expect(mockConversationService.saveConversation).toHaveBeenCalledWith(mockConversation);
    });

    it('should handle errors when saving conversation fails', async () => {
      const errorMessage = 'Failed to save conversation';
      mockConversationService.saveConversation.mockRejectedValue(new Error(errorMessage));

      await expect(controller.saveConversation(mockConversation as Conversation)).rejects.toThrow(errorMessage);
    });
  });
});
