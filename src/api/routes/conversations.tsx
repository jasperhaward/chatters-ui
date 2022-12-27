import type { Conversation, Message } from "@types";
import { generateId } from "@utils";
import { response, conversations, user, contacts } from "../mockData";

async function getConversations(): Promise<Conversation[]> {
    return response(conversations, 1000);
}

interface CreateConversationParams {
    recipientId: string;
    message: Omit<SendMessageParams, "conversationId">;
}

async function createConversation(
    params: CreateConversationParams
): Promise<Conversation> {
    const recipient = contacts.find((contact) => {
        return contact.id === params.recipientId;
    })!;

    const conversation: Conversation = {
        id: generateId(),
        recipients: [recipient],
        messages: [],
    };

    const message = await sendMessage({
        ...params.message,
        conversationId: conversation.id,
    });

    const conversationWithMessage: Conversation = {
        ...conversation,
        messages: [message],
    };

    return response(conversationWithMessage, 750);
}

interface SendMessageParams {
    content: string;
    conversationId: string;
    /**
     * Will be needed in the future as a new conversation's recipients
     * are the selected recipients and the current user.
     */
    userId: string;
}

async function sendMessage({
    content,
    conversationId,
    userId,
}: SendMessageParams): Promise<Message> {
    const message: Message = {
        id: generateId(),
        conversationId,
        content,
        createdAt: new Date().toISOString(),
        createdBy: user,
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

    return response(updatedConversation, 1500);
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

    return response(updatedConversation, 1500);
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
