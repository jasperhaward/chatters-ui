import styles from "./HighlightedText.module.scss";

export interface HighlightedTextProps {
    query: string;
    value: string;
}

// See https://www.vladopandzic.com/react/creating-react-highlighter-component/

export function HighlightedText({ query, value }: HighlightedTextProps) {
    const substrings = value.split(new RegExp(`(${query})`, "i"));

    return (
        <>
            {substrings.map((substring, index) => {
                if (substring.toUpperCase() === query.toUpperCase()) {
                    return (
                        <mark key={index} className={styles.highlighted}>
                            {substring}
                        </mark>
                    );
                }

                return substring;
            })}
        </>
    );
}
