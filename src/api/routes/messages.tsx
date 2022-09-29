import type { Message } from "@types";
import { generateId } from "@utils/id";
import { user, contacts, messages } from "../mockData";

export async function get() {
    return new Promise<Message[]>((resolve) => {
        setTimeout(() => resolve(messages), 1000);
    });
}

export interface CreateMessageParams {
    content: string;
    conversationId: string;
    createdBy: string;
}

export async function create(params: CreateMessageParams) {
    return new Promise<Message>((resolve) => {
        const users = [user, ...contacts];

        const message: Message = {
            id: generateId(),
            ...params,
            createdAt: new Date().toISOString(),
            createdBy: users.find((user) => {
                return user.id === params.createdBy;
            })!,
        };

        setTimeout(() => resolve(message), 700);
    });
}
