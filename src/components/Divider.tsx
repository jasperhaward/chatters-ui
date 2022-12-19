import styles from "./Divider.module.scss";

export interface DividerProps {
    children: string;
}

export function Divider({ children }: DividerProps) {
    return (
        <div class={styles.divider}>
            <span>{children}</span>
            <div className={styles.line} />
        </div>
    );
}
