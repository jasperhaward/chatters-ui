import { useMemo } from "preact/hooks";
import { Conversation as IConversation } from "@types";
import { Conversation, NoResultsText, ScrollableContainer } from ".";

export interface ConversationsViewProps {
    conversations: IConversation[];
    search: string;
    selectedConversation: IConversation;
    onConversationClick: (conversation: IConversation) => void;
}

export function ConversationsView({
    conversations,
    search,
    selectedConversation,
    onConversationClick,
}: ConversationsViewProps) {
    const filteredConversations = useMemo(() => {
        if (search === "") {
            return conversations;
        }

        return conversations.filter(filterByRecipients(search));
    }, [search, conversations]);

    function filterByRecipients(searchTerm: string) {
        return (conversation: IConversation) => {
            return conversation.recipients
                .map((recipient) => recipient.username.toUpperCase())
                .join()
                .includes(searchTerm.toUpperCase());
        };
    }

    if (filteredConversations.length === 0) {
        return <NoResultsText>No conversations found.</NoResultsText>;
    }

    return (
        <ScrollableContainer>
            {filteredConversations.map((conversation) => (
                <Conversation
                    key={conversation.id}
                    conversation={conversation}
                    search={search}
                    isSelected={conversation.id === selectedConversation?.id}
                    onClick={onConversationClick}
                />
            ))}
        </ScrollableContainer>
    );
}
