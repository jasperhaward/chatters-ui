import { ComponentChildren } from "preact";
import styles from "./Popover.module.scss";

export interface PopoverContainerProps {
    children: ComponentChildren;
}

export function PopoverContainer({ children }: PopoverContainerProps) {
    return <div className={styles.popoverContainer}>{children}</div>;
}

export interface PopoverProps {
    show: boolean;
    toggle: () => void;
    align?: "left" | "right";
    children: ComponentChildren;
}

export function Popover({
    show,
    toggle,
    align = "right",
    children,
}: PopoverProps) {
    return (
        <div
            className={`${styles.popover} ${styles[align]} ${
                show ? styles.show : ""
            }`}
        >
            {children}
        </div>
    );
}
