import { useEffect, useMemo, useRef } from "preact/hooks";
import styles from "./Conversation.module.scss";

import { DRAFT_CONVERSATION_ID } from "@constants";
import { useCurrentUser } from "@hooks";
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
    const user = useCurrentUser();
    const button = useRef<HTMLButtonElement>(null);

    const [message] = conversation.messages;

    useEffect(() => {
        if (isSelected && button.current) {
            button.current.scrollIntoView();
        }
    }, [isSelected]);

    const isCreatedByCurrentUser = useMemo(() => {
        return message.createdBy.id === user.id;
    }, [conversation, user]);

    const isDraftConversation = useMemo(() => {
        return conversation.id === DRAFT_CONVERSATION_ID;
    }, [conversation]);

    const isGroupConversation = useMemo(() => {
        return conversation.recipients.length > 1;
    }, [conversation]);

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
                                isCreatedByCurrentUser={isCreatedByCurrentUser}
                            />
                            {message.content}
                        </>
                    )}
                </div>
            </div>
        </button>
    );
}
