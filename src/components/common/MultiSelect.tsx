import styles from "./MultiSelect.module.scss";
import { Pill, HighlightedText } from "..";

export interface MultiSelectOption {
    text: string;
    value: string;
    spinner?: boolean;
}

export interface MultiSelectProps {
    className?: string;
    value: MultiSelectOption[];
    query?: string;
    disabled?: boolean;
    onRemove: (option: MultiSelectOption) => void;
}

export function MultiSelect({
    className,
    value,
    query,
    disabled,
    onRemove,
}: MultiSelectProps) {
    return (
        <div className={`${styles.multiSelect} ${className || ""}`}>
            {value.map((option) => (
                <Pill
                    key={option.value}
                    disabled={disabled}
                    spinner={option.spinner}
                    onClick={() => onRemove(option)}
                >
                    {query ? (
                        <HighlightedText query={query} value={option.text} />
                    ) : (
                        option.text
                    )}
                </Pill>
            ))}
        </div>
    );
}
