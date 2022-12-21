import { useMemo } from "preact/hooks";
import styles from "./Conversation.module.scss";

import { DRAFT_CONVERSATION_ID } from "@constants";
import { Conversation as IConversation } from "@types";
import {
    Icon,
    HighlightedText,
    ConversationMessageAuthor,
    ConversationMessageTimestamp,
} from ".";

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
            onClick={() => onClick(conversation)}
        >
            <Icon icon={["fas", isGroupConversation ? "users" : "user"]} />
            <div className={styles.details}>
                <div>
                    <HighlightedText
                        className={styles.recipients}
                        query={search}
                        value={conversation.recipients
                            .map((recipient) => recipient.username)
                            .join(", ")}
                    />
                    {!isDraftConversation && (
                        <ConversationMessageTimestamp
                            message={message}
                            isSelectedConversation={isSelected}
                        />
                    )}
                </div>
                <div className={styles.message}>
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
