import type { Message, User } from "@types";
import { generateId } from "@utils";
import { user, contacts, messages } from "../mockData";

export async function get() {
    return new Promise<Message[]>((resolve) => {
        setTimeout(() => resolve(messages), 1000);
    });
}

export interface CreateMessageParams {
    content: string;
    conversationId: string;
    createdBy: User;
}

export async function create(params: CreateMessageParams) {
    return new Promise<Message>((resolve) => {
        const message: Message = {
            id: generateId(),
            ...params,
            createdAt: new Date().toISOString(),
            createdBy: params.createdBy,
        };

        setTimeout(() => resolve(message), 700);
    });
}
