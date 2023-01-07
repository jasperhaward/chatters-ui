import styles from "./Contact.module.scss";

import { User } from "@types";
import { Icon, HighlightedText } from "@components";

export interface ContactProps {
    contact: User;
    query: string;
    disabled?: boolean;
    onClick: (contact: User) => void;
}

export default function Contact({
    contact,
    query,
    disabled,
    onClick,
}: ContactProps) {
    return (
        <button
            className={styles.contact}
            disabled={disabled}
            onClick={() => onClick(contact)}
        >
            <Icon icon={["fas", "user"]} />
            <HighlightedText
                className={styles.username}
                query={query}
                value={contact.username}
            />
        </button>
    );
}
