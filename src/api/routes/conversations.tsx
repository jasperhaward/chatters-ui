import type { Conversation, User } from "@types";
import { generateId } from "@utils";
import { conversations, contacts } from "../mockData";

export async function get() {
    return new Promise<Conversation[]>((resolve) => {
        setTimeout(() => resolve(conversations), 1000);
    });
}

export interface CreateConversationParams {
    recipient: User;
}

export async function create(params: CreateConversationParams) {
    return new Promise<Conversation>((resolve) => {
        const conversation: Conversation = {
            id: generateId(),
            recipients: [params.recipient],
            messages: [],
        };

        setTimeout(() => resolve(conversation), 750);
    });
}

export interface AddRecipientParams {
    conversationId: string;
    userId: string;
}

async function add(params: AddRecipientParams) {
    return new Promise<Conversation>((resolve) => {
        const conversation = conversations.find((conversation) => {
            return conversation.id === params.conversationId;
        })!;

        const contact = contacts.find((contact) => {
            return contact.id === params.userId;
        })!;

        const updatedConversation: Conversation = {
            ...conversation,
            recipients: [...conversation.recipients, contact],
        };

        setTimeout(() => resolve(updatedConversation), 750);
    });
}

export interface RemoveRecipientParams {
    conversationId: string;
    userId: string;
}

async function remove(params: RemoveRecipientParams) {
    return new Promise<Conversation>((resolve) => {
        const conversation = conversations.find((conversation) => {
            return conversation.id === params.conversationId;
        })!;

        const updatedConversation: Conversation = {
            ...conversation,
            recipients: conversation.recipients.filter((recipient) => {
                return recipient.id !== params.userId;
            }),
        };

        setTimeout(() => resolve(updatedConversation), 500);
    });
}

export const recipients = { add, remove };
