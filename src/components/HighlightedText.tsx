export interface HighlightedTextProps {
    className?: string;
    query: string;
    value: string;
}

// See https://www.vladopandzic.com/react/creating-react-highlighter-component/

export function HighlightedText({
    className,
    query,
    value,
}: HighlightedTextProps) {
    return (
        <span className={className}>
            {value
                // regex capture group to split value by query, but also include the query value in the returned array
                .split(new RegExp(`(${query})`, "i"))
                .map((substring, index) => {
                    if (substring.toUpperCase() === query.toUpperCase()) {
                        return <mark key={index}>{substring}</mark>;
                    }

                    return substring;
                })}
        </span>
    );
}
