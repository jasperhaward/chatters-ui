import { Fragment } from "preact";
import { useMemo } from "preact/hooks";

import { sortAlphabeticallyBy } from "@utils";
import { User as IUser } from "@types";
import { Contact, NoResultsText, Divider } from ".";

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
    const filteredContacts = useMemo(() => {
        return contacts
            .filter(filterByUsername(search))
            .sort(sortAlphabeticallyBy("username"));
    }, [search, contacts]);

    function filterByUsername(searchTerm: string) {
        return (contact: IUser) => {
            return contact.username
                .toUpperCase()
                .includes(searchTerm.toUpperCase());
        };
    }

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
        <>
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
        </>
    );
}
