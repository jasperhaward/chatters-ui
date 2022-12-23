import { useEffect, useMemo, useRef } from "preact/hooks";
import styles from "./Conversation.module.scss";

import { DRAFT_CONVERSATION_ID } from "@constants";
import { Conversation as IConversation } from "@types";
import { Icon, HighlightedText, ConversationMessageAuthor, Timestamp } from ".";

export interface ConversationsProps {
    conversation: IConversation;
    search: string;
    isSelected: boolean;
    onClick: (conversation: IConversation) => void;
}

export function Conversation({
    conversation,
    search,
    isSelected,
    onClick,
}: ConversationsProps) {
    const button = useRef<HTMLButtonElement>(null);

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

    const [message] = conversation.messages;

    return (
        <button
            className={`${styles.conversation} ${
                isSelected ? styles.selected : ""
            }`}
            ref={button}
            onClick={() => onClick(conversation)}
        >
            <Icon icon={["fas", isGroupConversation ? "users" : "user"]} />
            <div className={styles.details}>
                <div>
                    <span className={styles.recipients}>
                        <HighlightedText
                            query={search}
                            value={conversation.recipients
                                .map((recipient) => recipient.username)
                                .join(", ")}
                        />
                    </span>
                    {!isDraftConversation && (
                        <Timestamp
                            className={`${styles.timestamp} ${
                                isSelected ? styles.selected : ""
                            }`}
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
