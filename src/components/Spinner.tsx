import { ComponentChildren } from "preact";
import styles from "./Spinner.module.scss";

export interface SpinnerProps {
    size?: "xs" | "sm" | "md" | "lg";
    color?: "green" | "grey-xdark";
}

export function Spinner({ size = "md", color = "green" }: SpinnerProps) {
    return (
        <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export interface SpinnerContainerProps {
    children: ComponentChildren;
}

export function SpinnerContainer({ children }: SpinnerContainerProps) {
    return <div className={styles.spinnerContainer}>{children}</div>;
}
