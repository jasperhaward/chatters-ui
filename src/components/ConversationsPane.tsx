import { useMemo } from "preact/hooks";
import styles from "./ConversationsPane.module.scss";
import { Conversation as IConversation, Session } from "@types";
import { Conversation, Spinner, SpinnerContainer } from "@components";

export interface ConversationsPaneProps {
    search: string;
    session: Session | undefined;
    conversations: IConversation[];
    selectedConversation: IConversation | undefined;
    onConversationClick: (conversation: IConversation) => void;
}

export function ConversationsPane({
    search,
    session,
    conversations,
    selectedConversation,
    onConversationClick,
}: ConversationsPaneProps) {
    if (!selectedConversation || !session) {
        return (
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        );
    }

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
                        user={session.user}
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
