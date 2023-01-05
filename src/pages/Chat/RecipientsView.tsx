import { useMemo, useState } from "preact/hooks";
import styles from "./RecipientsView.module.scss";

import {
    MultiSelect,
    ScrollableContainer,
    MultiSelectOption,
} from "@components";
import { sortAlphabeticallyBy, queryBy } from "@utils";
import { Conversation, User } from "@types";

import ContactsView from "./ContactsView";

export interface RecipientsViewProps {
    selectedConversation: Conversation;
    search: string;
    contacts: User[];
    onRecipientAdd: (recipient: User) => Promise<void>;
    onRecipientRemove: (recipient: User) => Promise<void>;
}

export default function RecipientsView({
    selectedConversation,
    search,
    contacts,
    ...props
}: RecipientsViewProps) {
    const [disabled, setDisabled] = useState(false);

    /**
     * Conversation recipients filtered by the search term,
     * sorted alphabetically, and mapped to MultiSelect options.
     */
    const recipientMultiSelectOptions = useMemo<MultiSelectOption[]>(() => {
        return selectedConversation.recipients
            .filter(queryBy("username", search))
            .sort(sortAlphabeticallyBy("username"))
            .map((recipient) => ({
                value: recipient.id,
                text: recipient.username,
            }));
    }, [selectedConversation, search]);

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
        })!;

        setDisabled(true);

        await props.onRecipientRemove(recipient);

        setDisabled(false);
    }

    return (
        <>
            {recipientMultiSelectOptions.length > 0 && (
                <MultiSelect
                    className={styles.recipients}
                    value={recipientMultiSelectOptions}
                    query={search}
                    disabled={
                        // should not be able to remove the only recipient of a conversation
                        disabled || selectedConversation.recipients.length === 1
                    }
                    onRemove={onRecipientRemove}
                />
            )}
            {nonRecipientContacts.length > 0 && (
                <ScrollableContainer>
                    <ContactsView
                        search={search}
                        contacts={nonRecipientContacts}
                        disabled={disabled}
                        onContactClick={onRecipientAdd}
                    />
                </ScrollableContainer>
            )}
        </>
    );
}
