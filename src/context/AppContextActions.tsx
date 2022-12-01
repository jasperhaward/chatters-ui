import type { Conversation, Message, User } from "@types";

type Reducers = "contacts" | "conversations";

interface Action {
    type: `${Reducers}/${string}`;
    payload: unknown;
}

export interface ContactsAppendAction extends Action {
    type: "contacts/append";
    payload: User[];
}

export interface ConversationsAppendAction extends Action {
    type: "conversations/append";
    payload: Conversation[];
}

export interface ConversationsMessagesAppendAction extends Action {
    type: "conversations/messages/append";
    payload: {
        conversationId: string;
        messages: Message[];
    };
}

export interface ConversationsMessagesPrependAction extends Action {
    type: "conversations/messages/prepend";
    payload: {
        conversationId: string;
        messages: Message[];
    };
}
