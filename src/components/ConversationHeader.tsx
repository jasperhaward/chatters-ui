import styles from "./ConversationHeader.module.scss";
import { Conversation } from "@types";

export interface ConversationHeaderProps {
    selectedConversation: Conversation;
}

export function ConversationHeader({
    selectedConversation,
}: ConversationHeaderProps) {
    return (
        <div className={styles.conversationHeader}>
            <h2>
                {selectedConversation.recipients
                    .map((recpient) => recpient.username)
                    .join(", ")}
            </h2>
        </div>
    );
}
