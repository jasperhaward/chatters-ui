import styles from "./ConversationMessageTimestamp.module.scss";
import { Message } from "@types";

export interface ConversationMessageTimestampProps {
    message: Message;
    isSelectedConversation: boolean;
}

export function ConversationMessageTimestamp({
    message,
    isSelectedConversation,
}: ConversationMessageTimestampProps) {
    function format(createdAt: Date) {
        if (createdAt.isToday()) {
            return createdAt.toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
        } else if (createdAt.isYesterday()) {
            return "Yesterday";
        } else if (createdAt.isThisWeek()) {
            return createdAt.toLocaleString("en-GB", {
                weekday: "long",
            });
        } else {
            return createdAt.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
            });
        }
    }

    return (
        <time
            className={`${styles.timestamp} ${
                isSelectedConversation ? styles.selected : ""
            }`}
        >
            {format(new Date(message.createdAt))}
        </time>
    );
}
