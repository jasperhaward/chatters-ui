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
    const substrings = value.split(new RegExp(`(${query})`, "i"));

    function renderSubstring(substring: string, index: number) {
        if (substring.toUpperCase() === query.toUpperCase()) {
            return <b key={index}>{substring}</b>;
        }

        return substring;
    }

    return <span className={className}>{substrings.map(renderSubstring)}</span>;
}
