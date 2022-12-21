import styles from "./Contact.module.scss";

import { User } from "@types";
import { Icon, HighlightedText } from ".";

export interface ContactProps {
    contact: User;
    search: string;
    onClick: (contact: User) => void;
}

export function Contact({ contact, search, onClick }: ContactProps) {
    return (
        <button className={styles.contact} onClick={() => onClick(contact)}>
            <Icon icon={["fas", "user"]} />
            <span className={styles.username}>
                <HighlightedText query={search} value={contact.username} />
            </span>
        </button>
    );
}
