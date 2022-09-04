import type { Reducer } from "preact/hooks";
import type { Conversation } from "@types";
import type { AppContextAction } from "../AppContext";

const conversations: Reducer<Conversation[], AppContextAction> = (
    state,
    action
) => {
    switch (action.type) {
        case "conversations/append":
            return [...state, ...action.payload];
        case "conversations/messages/append":
            return state.map((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            ...action.payload.messages,
                        ],
                    };
                }

                return conversation;
            });
        case "conversations/messages/prepend":
            return state.map((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        messages: [
                            ...action.payload.messages,
                            ...conversation.messages,
                        ],
                    };
                }

                return conversation;
            });
        default:
            return state;
    }
};

export default conversations;
