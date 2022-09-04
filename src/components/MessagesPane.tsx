import styles from "./MessagesPane.module.scss";

import { Conversation, Message } from "@types";
import { Spinner } from "@components";

export interface MessagesPaneProps {
    selectedConversation: Conversation | undefined;
}

export function MessagesPane({ selectedConversation }: MessagesPaneProps) {
    if (!selectedConversation) {
        return <Spinner />;
    }

    const sender = (message: Message) => {
        const sender = selectedConversation.recipients.find(
            (recipient) => recipient.id === message.createdBy
        );

        if (!sender) {
            throw new Error(`Missing sender '${message.createdBy}'`);
        }

        return sender;
    };

    return (
        <div className={styles.messagesPane}>
            <h2>
                {selectedConversation.recipients
                    .map((recpient) => recpient.username)
                    .join(", ")}
            </h2>
            {selectedConversation.messages.map((message) => (
                <div key={message.id}>
                    <div>{sender(message).username}</div>
                    <div>{message.content}</div>
                </div>
            ))}
        </div>
    );
}
