import styles from "./Pill.module.scss";
import { IconButton, IconTuple } from "..";

export interface PillProps {
    icon?: IconTuple;
    children: string;
    onClick: () => void;
}

export function Pill({
    icon = ["fas", "times"],
    children,
    onClick,
}: PillProps) {
    return (
        <div className={styles.pill}>
            <span>{children}</span>
            <IconButton
                icon={icon}
                size="sm"
                color="grey-xdark"
                onClick={onClick}
            />
        </div>
    );
}
