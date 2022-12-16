import { ComponentChildren } from "preact";
import styles from "./PopoverMenu.module.scss";
import { IconButton } from ".";

export interface PopoverMenuContainerProps {
    children: ComponentChildren;
}

export function PopoverMenuContainer({ children }: PopoverMenuContainerProps) {
    return <div className={styles.popoverMenuContainer}>{children}</div>;
}

export interface PopoverMenuProps {
    show: boolean;
    toggle: () => void;
    align?: "left" | "right";
    title: string;
    children: ComponentChildren;
}

export function PopoverMenu({
    show,
    toggle,
    align = "right",
    title,
    children,
}: PopoverMenuProps) {
    if (!show) return null;

    return (
        <>
            <div className={styles.popoverCurtain} onClick={toggle} />
            <div className={`${styles.popoverMenu} ${styles[align]}`}>
                {children}
            </div>
        </>
    );
}
