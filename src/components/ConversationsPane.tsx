import { useMemo } from "preact/hooks";
import styles from "./ConversationsPane.module.scss";
import { Conversation as IConversation } from "@types";
import { Conversation } from ".";

export interface ConversationsPaneProps {
    search: string;
    conversations: IConversation[];
    selectedConversation: IConversation;
    onConversationClick: (conversation: IConversation) => void;
}

export function ConversationsPane({
    search,
    conversations,
    selectedConversation,
    onConversationClick,
}: ConversationsPaneProps) {
    function filterByRecipients(conversation: IConversation) {
        return conversation.recipients
            .map((recipient) => recipient.username.toUpperCase())
            .join()
            .includes(search.trim().toUpperCase());
    }

    const filteredConversations = useMemo(() => {
        return conversations.filter(filterByRecipients);
    }, [search, conversations]);

    return (
        <div className={styles.conversationsPane}>
            {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                    <Conversation
                        key={conversation.id}
                        search={search}
                        conversation={conversation}
                        selected={conversation.id === selectedConversation?.id}
                        onClick={onConversationClick}
                    />
                ))
            ) : (
                <span>No conversations found.</span>
            )}
        </div>
    );
}
