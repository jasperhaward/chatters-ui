import { createContext } from "preact";
import type { Conversation } from "@types";

import type {
    ConversationsAppendAction,
    ConversationsMessagesAppendAction,
    ConversationsMessagesPrependAction,
} from "./AppContextActions";

export type AppContextAction =
    | ConversationsAppendAction
    | ConversationsMessagesAppendAction
    | ConversationsMessagesPrependAction;

export interface AppContextState {
    conversations: Conversation[];
}

export type TAppContext = [
    state: AppContextState,
    dispatch: (action: AppContextAction) => void
];

export const AppContext = createContext<TAppContext>(null as any);
