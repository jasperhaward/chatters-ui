import { ComponentChildren } from "preact";
import styles from "./ScrollableContainer.module.scss";

export interface ScrollableContainerParentProps {
    className?: string;
    children: ComponentChildren;
}

export function ScrollableContainerParent({
    className,
    children,
}: ScrollableContainerParentProps) {
    return (
        <div className={`${styles.scrollableParent} ${className || ""}`}>
            {children}
        </div>
    );
}

export interface ScrollableContainerProps {
    className?: string;
    spacing?: "lg" | "md" | "sm";
    children: ComponentChildren;
}

export function ScrollableContainer({
    className,
    spacing = "md",
    children,
}: ScrollableContainerProps) {
    return (
        <div
            className={`${styles.scrollableContainer} ${styles[spacing]} ${
                className || ""
            }`}
        >
            {children}
        </div>
    );
}
