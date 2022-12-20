import styles from "./Author.module.scss";

import { Message } from "@types";
import { useCurrentUser } from "@hooks";

export interface AuthorProps {
    message: Message;
    isSelectedConversation: boolean;
    isGroupConversation: boolean;
}

export function Author({
    message,
    isSelectedConversation,
    isGroupConversation,
}: AuthorProps) {
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
