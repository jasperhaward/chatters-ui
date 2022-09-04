import { User, Message } from "@types";

export interface Conversation {
    id: string;
    recipients: User[];
    messages: Message[];
}
