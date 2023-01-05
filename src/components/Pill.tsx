import { ComponentChildren } from "preact";
import styles from "./Pill.module.scss";
import { IconButton } from ".";

export interface PillProps {
    disabled?: boolean;
    children: ComponentChildren;
    onClick: () => void;
}

export function Pill({ disabled, children, onClick }: PillProps) {
    return (
        <div className={`${styles.pill} ${disabled ? styles.disabled : ""}`}>
            <span>{children}</span>
            <IconButton
                icon={["fas", "times"]}
                size="sm"
                disabled={disabled}
                color="grey-xdark"
                onClick={onClick}
            />
        </div>
    );
}
