import { createContext } from "preact";
import type { Conversation, User } from "@types";

import type {
    ContactsAppendAction,
    ConversationsPrependAction,
    ConversationsAppendAction,
    ConversationsRemoveAction,
    ConversationsReplaceAction,
    ConversationsMessagesAppendAction,
    ConversationsMessagesPrependAction,
    ConversationsRecipientsAddAction,
    ConversationsRecipientsRemoveAction,
} from "./AppContextActions";

export type AppContextAction =
    | ContactsAppendAction
    | ConversationsPrependAction
    | ConversationsAppendAction
    | ConversationsRemoveAction
    | ConversationsReplaceAction
    | ConversationsMessagesAppendAction
    | ConversationsMessagesPrependAction
    | ConversationsRecipientsAddAction
    | ConversationsRecipientsRemoveAction;

export interface AppContextState {
    contacts: User[];
    conversations: Conversation[];
}

export type TAppContext = [
    state: AppContextState,
    dispatch: (action: AppContextAction) => void
];

export const AppContext = createContext<TAppContext>(null as any);
