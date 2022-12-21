import { useMemo } from "preact/hooks";
import styles from "./ConversationHeader.module.scss";

import { sortAlphabeticallyBy } from "@utils";
import { Conversation, User } from "@types";
import { useToggle } from "@hooks";
import { MultiSelect, MultiSelectOption } from ".";

export interface ConversationHeaderProps {
    contacts: User[];
    selectedConversation: Conversation;
    onRecipientAdd: (recipient: User) => void;
    onRecipientRemove: (recipient: User) => void;
}

export function RecipientsView({
    contacts,
    selectedConversation,
    onRecipientAdd,
    onRecipientRemove,
}: ConversationHeaderProps) {
    const [showRecipients, toggleShowRecipients] = useToggle(false);

    /** Conversation recipients sorted alphabetically */
    const sortedRecipients = useMemo(() => {
        return selectedConversation.recipients.sort(
            sortAlphabeticallyBy("username")
        );
    }, [selectedConversation]);

    /** Contacts which are not conversation recipients */
    const nonRecipientContacts = useMemo(() => {
        return contacts
            .filter((contact) => {
                return !selectedConversation.recipients.find((recipient) => {
                    return recipient.id === contact.id;
                });
            })
            .sort(sortAlphabeticallyBy("username"));
    }, [contacts, selectedConversation]);

    function toMultiSelectOption(recipient: User): MultiSelectOption {
        return {
            value: recipient.id,
            text: recipient.username,
        };
    }

    function onOptionAdd(option: MultiSelectOption) {
        const recipient = nonRecipientContacts.find((contact) => {
            return contact.id === option.value;
        });

        onRecipientAdd(recipient!);
    }

    function onOptionRemove(option: MultiSelectOption) {
        const recipient = sortedRecipients.find((contact) => {
            return contact.id === option.value;
        });

        onRecipientRemove(recipient!);
    }

    return (
        <div className={styles.conversationHeader}>
            <MultiSelect
                value={sortedRecipients.map(toMultiSelectOption)}
                options={nonRecipientContacts.map(toMultiSelectOption)}
                placeholder="Search contacts..."
                onOptionAdd={onOptionAdd}
                onOptionRemove={onOptionRemove}
            />
        </div>
    );
}
