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
            // when messages are prepended, it's safe to assume they are the most
            // recent recieved/sent messages, hence the conversation which they belong to
            // should become the first conversation in the conversations array

            const conversation = state.find((conversation) => {
                return conversation.id === action.payload.conversationId;
            })!;

            const updatedConversation: Conversation = {
                ...conversation,
                messages: [
                    ...action.payload.messages,
                    ...conversation.messages,
                ],
            };

            return [
                updatedConversation,
                ...state.filter((conversation) => {
                    return conversation.id !== action.payload.conversationId;
                }),
            ];
        case "conversations/recipients/add":
            return state.map((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        recipients: [
                            ...conversation.recipients,
                            action.payload.recipient,
                        ],
                    };
                }

                return conversation;
            });
        case "conversations/recipients/remove":
            return state.map((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        recipients: conversation.recipients.filter(
                            (recipient) => {
                                return (
                                    recipient.id !== action.payload.recipient.id
                                );
                            }
                        ),
                    };
                }

                return conversation;
            });
        default:
            return state;
    }
};

export default conversations;
