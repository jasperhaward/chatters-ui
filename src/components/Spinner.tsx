import styles from "./Spinner.module.scss";

export function Spinner() {
    return (
        <div class={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
