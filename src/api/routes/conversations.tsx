import type { Conversation, Message } from "@types";
import { generateId } from "@utils";
import { response, conversations, contacts } from "../mockData";

async function getConversations(): Promise<Conversation[]> {
    return response(conversations, 1000);
}

interface CreateConversationParams {
    recipientId: string;
}

async function createConversation(
    params: CreateConversationParams
): Promise<Conversation> {
    const recipients = contacts.filter((contact) => {
        return contact.id === params.recipientId;
    })!;

    const conversation: Conversation = {
        id: generateId(),
        recipients,
        messages: [],
    };

    return response(conversation, 750);
}

interface SendMessageParams {
    content: string;
    conversationId: string;
    createdById: string;
}

async function sendMessage({
    content,
    conversationId,
    createdById,
}: SendMessageParams): Promise<Message> {
    const createdBy = contacts.find((contact) => {
        return contact.id === createdById;
    })!;

    const message: Message = {
        id: generateId(),
        conversationId,
        content,
        createdAt: new Date().toISOString(),
        createdBy,
    };

    return response(message, 700);
}

interface AddRecipientParams {
    conversationId: string;
    recipientId: string;
}

async function addRecipient(params: AddRecipientParams): Promise<Conversation> {
    const conversation = conversations.find((conversation) => {
        return conversation.id === params.conversationId;
    })!;

    const recipient = contacts.find((contact) => {
        return contact.id === params.recipientId;
    })!;

    const updatedConversation: Conversation = {
        ...conversation,
        recipients: [...conversation.recipients, recipient],
    };

    return response(updatedConversation, 750);
}

interface RemoveRecipientParams {
    conversationId: string;
    recipientId: string;
}

async function removeRecipient(
    params: RemoveRecipientParams
): Promise<Conversation> {
    const conversation = conversations.find((conversation) => {
        return conversation.id === params.conversationId;
    })!;

    const updatedRecipients = conversation.recipients.filter((recipient) => {
        return recipient.id !== params.recipientId;
    });

    const updatedConversation: Conversation = {
        ...conversation,
        recipients: updatedRecipients,
    };

    return response(updatedConversation, 500);
}

export default {
    get: getConversations,
    create: createConversation,
    messages: {
        send: sendMessage,
    },
    recipients: {
        add: addRecipient,
        remove: removeRecipient,
    },
};
