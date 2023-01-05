import styles from "./NoResultsText.module.scss";

export interface NoResultsTextProps {
    children: string;
}

export default function NoResultsText({ children }: NoResultsTextProps) {
    return <div className={styles.noResults}>{children}</div>;
}
