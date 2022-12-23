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
    children: ComponentChildren;
}

export function ScrollableContainer({
    className,
    children,
}: ScrollableContainerProps) {
    return (
        <div className={`${styles.scrollableContainer} ${className || ""}`}>
            {children}
        </div>
    );
}
