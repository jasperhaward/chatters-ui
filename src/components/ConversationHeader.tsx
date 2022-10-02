import styles from "./ConversationHeader.module.scss";
import { Conversation, User } from "@types";
import { IconButton, PopoverContainer, Popover } from ".";
import { useCurrentUser, useToggle } from "@hooks";
import { useMemo } from "preact/hooks";

export interface ConversationHeaderProps {
    selectedConversation: Conversation;
    onRecipientAdd: (recipient: User) => void;
    onRecipientRemove: (recipient: User) => void;
}

export function ConversationHeader({
    selectedConversation,
    onRecipientAdd,
    onRecipientRemove,
}: ConversationHeaderProps) {
    const user = useCurrentUser();
    const [showRecipients, toggleShowRecipients] = useToggle(false);

    /** Contacts which are not conversation recipients */
    const nonRecipientContacts = useMemo(() => {
        return user.contacts.filter((contact) => {
            return selectedConversation.recipients.find((recipient) => {
                return recipient.id === contact.id;
            });
        });
    }, [user, selectedConversation]);

    /** Conversation recipients sorted alphabetically */
    const sortedRecipients = useMemo(() => {
        return selectedConversation.recipients.sort(sortAlphabetically);
    }, [selectedConversation]);

    function sortAlphabetically(a: User, b: User) {
        if (a.username > b.username) {
            return 1;
        } else if (a.username < b.username) {
            return -1;
        }

        return 0;
    }

    return (
        <div className={styles.conversationHeader}>
            <h2>
                {selectedConversation.recipients
                    .map((recpient) => recpient.username)
                    .join(", ")}
            </h2>
            <PopoverContainer>
                <IconButton
                    icon={["fas", "users"]}
                    color="green"
                    onClick={toggleShowRecipients}
                />
                <Popover show={showRecipients} toggle={toggleShowRecipients}>
                    TEST
                </Popover>
            </PopoverContainer>
        </div>
    );
}
