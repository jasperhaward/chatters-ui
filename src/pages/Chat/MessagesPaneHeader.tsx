import styles from "./MessagesPaneHeader.module.scss";
import { SubHeading } from "@components";
import { Conversation } from "@types";

export interface MessagesPaneHeaderProps {
    selectedConversation: Conversation;
}

export default function MessagesPaneHeader({
    selectedConversation,
}: MessagesPaneHeaderProps) {
    return (
        <div>
            <SubHeading className={styles.messagesHeader}>
                {selectedConversation.recipients
                    .map((recpient) => recpient.username)
                    .join(", ")}
            </SubHeading>
        </div>
    );
}
