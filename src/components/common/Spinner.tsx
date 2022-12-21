import { ComponentChildren } from "preact";
import styles from "./Spinner.module.scss";

export interface SpinnerProps {
    size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md" }: SpinnerProps) {
    return (
        <div class={`${styles.spinner} ${styles[size]}`}>
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
    return <div class={styles.spinnerContainer}>{children}</div>;
}
