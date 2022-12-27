import { Fragment } from "preact";
import { useMemo } from "preact/hooks";

import { sortAlphabeticallyBy, queryBy } from "@utils";
import { User as IUser } from "@types";
import { Contact, NoResultsText, Divider, ScrollableContainer } from ".";

export interface ContactsViewProps {
    contacts: IUser[];
    search: string;
    onContactClick: (conversation: IUser) => void;
}

export function ContactsView({
    contacts,
    search,
    onContactClick,
}: ContactsViewProps) {
    /** Contacts filtered by the search term & sorted alphabetically */
    const filteredContacts = useMemo(() => {
        return contacts
            .filter(queryBy("username", search))
            .sort(sortAlphabeticallyBy("username"));
    }, [search, contacts]);

    /**
     * Show the divider if there is no previous contact,
     * as the current contact must be the first contact in the array,
     * or when the first letters of the previous contact's
     * username and current contact's username are different.
     */
    function showDivider(prevContact: IUser | undefined, contact: IUser) {
        if (!prevContact) {
            return true;
        }

        return (
            prevContact.username[0].toUpperCase() !==
            contact.username[0].toUpperCase()
        );
    }

    if (filteredContacts.length === 0) {
        return <NoResultsText>No contacts found.</NoResultsText>;
    }

    return (
        <ScrollableContainer>
            {filteredContacts.map((contact, index) => (
                <Fragment key={contact.id}>
                    {showDivider(filteredContacts[index - 1], contact) && (
                        <Divider>{contact.username[0].toUpperCase()}</Divider>
                    )}
                    <Contact
                        contact={contact}
                        search={search}
                        onClick={onContactClick}
                    />
                </Fragment>
            ))}
        </ScrollableContainer>
    );
}
