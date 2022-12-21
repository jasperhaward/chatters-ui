import styles from "./MessagesPaneHeader.module.scss";
import { Conversation } from "@types";

export interface MessagesPaneHeaderProps {
    selectedConversation: Conversation;
}

export function MessagesPaneHeader({
    selectedConversation,
}: MessagesPaneHeaderProps) {
    return (
        <div>
            <h2 className={styles.messagesHeader}>
                {selectedConversation.recipients
                    .map((recpient) => recpient.username)
                    .join(", ")}
            </h2>
        </div>
    );
}
