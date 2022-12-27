import { ComponentChildren } from "preact";
import styles from "./Pill.module.scss";
import { IconButton, Spinner } from "..";

export interface PillProps {
    disabled?: boolean;
    spinner?: boolean;
    onClick: () => void;
    children: ComponentChildren;
}

export function Pill({ disabled, spinner, onClick, children }: PillProps) {
    return (
        <div className={`${styles.pill} ${disabled ? styles.disabled : ""}`}>
            <span>{children}</span>
            <div className={styles.icon}>
                {spinner ? (
                    <Spinner size="xs" color="grey-xdark" />
                ) : (
                    <IconButton
                        icon={["fas", "times"]}
                        size="sm"
                        disabled={disabled}
                        color="grey-xdark"
                        onClick={onClick}
                    />
                )}
            </div>
        </div>
    );
}
