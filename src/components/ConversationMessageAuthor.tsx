import styles from "./ConversationMessageAuthor.module.scss";

import { Message } from "@types";

export interface ConversationMessageAuthorProps {
    message: Message;
    isSelectedConversation: boolean;
    isGroupConversation: boolean;
    isCreatedByCurrentUser: boolean;
}

export function ConversationMessageAuthor({
    message,
    isSelectedConversation,
    isGroupConversation,
    isCreatedByCurrentUser,
}: ConversationMessageAuthorProps) {
    // don't show an author when the last message
    // came from the conversation's only other recipient (a dm)
    if (!isCreatedByCurrentUser && !isGroupConversation) {
        return null;
    }

    return (
        <span
            className={`${styles.author} ${
                isSelectedConversation ? styles.selected : ""
            }`}
        >
            {isCreatedByCurrentUser
                ? "You: "
                : `${message.createdBy.username}: `}
        </span>
    );
}
