import type { Conversation, Message } from "@types";

export interface ConversationsAppendAction {
    type: "conversations/append";
    payload: Conversation[];
}

export interface ConversationsMessagesAppendAction {
    type: "conversations/messages/append";
    payload: {
        conversationId: string;
        messages: Message[];
    };
}

export interface ConversationsMessagesPrependAction {
    type: "conversations/messages/prepend";
    payload: {
        conversationId: string;
        messages: Message[];
    };
}
