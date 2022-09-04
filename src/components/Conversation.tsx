import styles from "./Conversation.module.scss";
import { Conversation as IConversation, Message, User } from "@types";
import { Icon, HighlightedText, Timestamp } from ".";
import { useMemo } from "preact/hooks";

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

    const filteredRecipients = useMemo(() => {
        // remove current user
        return conversation.recipients.filter((recipient) => {
            return recipient.id !== user.id;
        });
    }, [conversation, user]);

    const isGroupChat = useMemo(() => {
        // filteredRecipients.length === 1 if its a direct message
        return filteredRecipients.length > 1;
    }, [filteredRecipients]);

    function author(message: Message) {
        const author = filteredRecipients.find((recipient) => {
            return recipient.id === message.createdBy;
        });

        if (author && !isGroupChat) return "";

        return (
            <span className={styles.author}>
                {author ? author.username : "You"}:
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
                        {filteredRecipients
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
