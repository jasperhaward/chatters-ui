import { useMemo } from "preact/hooks";
import styles from "./Conversation.module.scss";

import { DRAFT_CONVERSATION_ID } from "@constants";
import { Conversation as IConversation, User } from "@types";
import { Icon, HighlightedText, Author, Timestamp } from ".";

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

    function formatRecipients(recipients: User[]) {
        return recipients.map((recipient) => recipient.username).join(", ");
    }

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
                    >
                        {formatRecipients(conversation.recipients)}
                    </HighlightedText>
                    {!isDraftConversation && (
                        <Timestamp
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
                            <Author
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
