import { ComponentChildren } from "preact";
import styles from "./Pill.module.scss";
import { IconButton, IconTuple } from "..";

export interface PillProps {
    icon?: IconTuple;
    disabled?: boolean;
    onClick: () => void;
    children: ComponentChildren;
}

export function Pill({
    icon = ["fas", "times"],
    disabled,
    onClick,
    children,
}: PillProps) {
    return (
        <div className={styles.pill}>
            <span>{children}</span>
            <IconButton
                icon={icon}
                disabled={disabled}
                size="sm"
                color="grey-xdark"
                onClick={onClick}
            />
        </div>
    );
}
