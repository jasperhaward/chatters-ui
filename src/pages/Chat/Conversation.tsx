import { useEffect, useMemo, useRef } from "preact/hooks";
import styles from "./Conversation.module.scss";

import { Icon, HighlightedText, Timestamp } from "@components";
import { DRAFT_CONVERSATION_ID } from "@constants";
import { Conversation as IConversation } from "@types";

import ConversationMessageAuthor from "./ConversationMessageAuthor";

export interface ConversationsProps {
    conversation: IConversation;
    query: string;
    isSelected: boolean;
    onClick: (conversation: IConversation) => void;
}

export default function Conversation({
    conversation,
    query,
    isSelected,
    onClick,
}: ConversationsProps) {
    const button = useRef<HTMLButtonElement>(null);

    const [message] = conversation.messages;

    useEffect(() => {
        if (isSelected && button.current) {
            button.current.scrollIntoView();
        }
    }, [isSelected]);

    const isDraftConversation = useMemo(() => {
        return conversation.id === DRAFT_CONVERSATION_ID;
    }, [conversation]);

    const isGroupConversation = useMemo(() => {
        return conversation.recipients.length > 1;
    }, [conversation]);

    const formattedRecipients = useMemo(() => {
        return conversation.recipients
            .map((recipient) => recipient.username)
            .join(", ");
    }, [conversation]);

    return (
        <button
            className={`${styles.conversation} ${
                isSelected ? styles.selected : ""
            }`}
            ref={button}
            title={formattedRecipients}
            onClick={() => onClick(conversation)}
        >
            <Icon
                size="xl"
                icon={["fas", isGroupConversation ? "users" : "user"]}
            />
            <div className={styles.details}>
                <div className={styles.conversationDetails}>
                    <HighlightedText
                        className={styles.recipients}
                        query={query}
                        value={formattedRecipients}
                    />
                    {!isDraftConversation && (
                        <Timestamp
                            className={styles.timestamp}
                            timestamp={message.createdAt}
                            short={true}
                        />
                    )}
                </div>
                <div className={styles.messageDetails}>
                    {isDraftConversation ? (
                        "Draft"
                    ) : (
                        <>
                            <ConversationMessageAuthor
                                message={message}
                                isSelectedConversation={isSelected}
                                isGroupConversation={isGroupConversation}
                            />
                            {message.content}
                        </>
                    )}
                </div>
            </div>
        </button>
    );
}
