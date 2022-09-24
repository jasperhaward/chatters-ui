export interface HighlightedTextProps {
    className?: string;
    query: string;
    children: string;
}

// See https://www.vladopandzic.com/react/creating-react-highlighter-component/

export function HighlightedText({
    className,
    query,
    children,
}: HighlightedTextProps) {
    const substrings = children.split(new RegExp(`(${query})`, "i"));

    function renderSubstring(substring: string, index: number) {
        if (substring.toUpperCase() === query.toUpperCase()) {
            return <b key={index}>{substring}</b>;
        }

        return substring;
    }

    return (
        <span className={className}>
            {query === "" ? children : substrings.map(renderSubstring)}
        </span>
    );
}
