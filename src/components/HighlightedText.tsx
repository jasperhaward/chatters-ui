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
    const parts = children.split(new RegExp(`(${query})`, "i"));

    return (
        <span className={className}>
            {parts.map((part, index) =>
                part.toUpperCase() === query.toUpperCase() ? (
                    <b key={index}>{part}</b>
                ) : (
                    part
                )
            )}
        </span>
    );
}
