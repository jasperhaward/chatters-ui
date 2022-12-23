import { useMemo, useState } from "preact/hooks";

import { sortAlphabeticallyBy } from "@utils";
import { Conversation, User } from "@types";
import { MultiSelect, MultiSelectOption, ContactsView } from ".";

export interface RecipientsViewProps {
    selectedConversation: Conversation;
    search: string;
    contacts: User[];
    onRecipientAdd: (recipient: User) => Promise<void>;
    onRecipientRemove: (recipient: User) => Promise<void>;
}

export function RecipientsView({
    selectedConversation,
    search,
    contacts,
    ...props
}: RecipientsViewProps) {
    const [disabled, setDisabled] = useState(false);

    /**
     * Conversation recipients sorted alphabetically
     * and mapped to MultiSelect options.
     */
    const sortedRecipients: MultiSelectOption[] = useMemo(() => {
        return selectedConversation.recipients
            .sort(sortAlphabeticallyBy("username"))
            .map((recipient) => ({
                value: recipient.id,
                text: recipient.username,
            }));
    }, [selectedConversation]);

    /**
     * Contacts which are not conversation recipients.
     */
    const nonRecipientContacts = useMemo(() => {
        const recipientIds = selectedConversation.recipients.map(
            (recipient) => recipient.id
        );

        return contacts
            .filter((contact) => !recipientIds.includes(contact.id))
            .sort(sortAlphabeticallyBy("username"));
    }, [contacts, selectedConversation]);

    async function onRecipientAdd(recipient: User) {
        setDisabled(true);

        await props.onRecipientAdd(recipient);

        setDisabled(false);
    }

    async function onRecipientRemove(option: MultiSelectOption) {
        const recipient = contacts.find((contact) => {
            return contact.id === option.value;
        });

        setDisabled(true);

        await props.onRecipientRemove(recipient!);

        setDisabled(false);
    }

    return (
        <>
            <MultiSelect
                value={sortedRecipients}
                disabled={disabled}
                onRemove={onRecipientRemove}
            />
            <ContactsView
                search={search}
                contacts={nonRecipientContacts}
                onContactClick={onRecipientAdd}
            />
        </>
    );
}
