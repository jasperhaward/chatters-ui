import styles from "./ConversationMessageAuthor.module.scss";

import { Message } from "@types";
import { useCurrentUser } from "@hooks";

export interface ConversationMessageAuthorProps {
    message: Message;
    isSelectedConversation: boolean;
    isGroupConversation: boolean;
}

export function ConversationMessageAuthor({
    message,
    isSelectedConversation,
    isGroupConversation,
}: ConversationMessageAuthorProps) {
    const user = useCurrentUser();

    const isCreatedByCurrentUser = message.createdBy.id === user.id;

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
