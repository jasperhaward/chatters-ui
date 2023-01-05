import { useMemo } from "preact/hooks";
import styles from "./ConversationMessageAuthor.module.scss";

import { useCurrentUser } from "@hooks";
import { Message } from "@types";

export interface ConversationMessageAuthorProps {
    message: Message;
    isSelectedConversation: boolean;
    isGroupConversation: boolean;
}

export default function ConversationMessageAuthor({
    message,
    isSelectedConversation,
    isGroupConversation,
}: ConversationMessageAuthorProps) {
    const user = useCurrentUser();

    const isCreatedByCurrentUser = useMemo(() => {
        return message.createdBy.id === user.id;
    }, [message, user]);

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
