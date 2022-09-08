import { useMemo } from "preact/hooks";
import styles from "./Conversation.module.scss";
import { Conversation as IConversation, Message, User } from "@types";
import { Icon, HighlightedText, Timestamp } from ".";

export interface ConversationsProps {
    search: string;
    user: User;
    conversation: IConversation;
    selected: boolean;
    onClick: (conversation: IConversation) => void;
}

export function Conversation({
    search,
    user,
    conversation,
    selected,
    onClick,
}: ConversationsProps) {
    const [message] = conversation.messages;

    const isGroupChat = useMemo(() => {
        return conversation.recipients.length > 1;
    }, [conversation]);

    function author(message: Message) {
        const isCurrentUser = message.createdBy.id === user.id;

        // don't show an author when the last message
        // came from the conversation's only other recipient (a dm)
        if (!isCurrentUser && !isGroupChat) return "";

        return (
            <span className={styles.author}>
                {isCurrentUser ? "You" : message.createdBy.username}:
            </span>
        );
    }

    return (
        <button
            className={`${styles.conversation} ${
                selected ? styles.selected : ""
            }`}
            onClick={() => onClick(conversation)}
        >
            <Icon icon={["fas", isGroupChat ? "users" : "user"]} />
            <div className={styles.details}>
                <div>
                    <HighlightedText
                        className={styles.recipients}
                        query={search}
                    >
                        {conversation.recipients
                            .map((recipient) => recipient.username)
                            .join(", ")}
                    </HighlightedText>
                    <Timestamp className={styles.timestamp} message={message} />
                </div>
                <div className={styles.message}>
                    {author(message)} {message.content}
                </div>
            </div>
        </button>
    );
}
