import styles from "./MultiSelect.module.scss";
import { Pill } from "..";

export interface MultiSelectOption {
    text: string;
    value: string;
}

export interface MultiSelectProps {
    className?: string;
    value: MultiSelectOption[];
    disabled?: boolean;
    onRemove: (option: MultiSelectOption) => void;
}

export function MultiSelect({
    className,
    value,
    disabled,
    onRemove,
}: MultiSelectProps) {
    return (
        <div className={`${styles.multiSelect} ${className || ""}`}>
            {value.map((option) => (
                <Pill
                    key={option.value}
                    disabled={disabled}
                    onClick={() => onRemove(option)}
                >
                    {option.text}
                </Pill>
            ))}
        </div>
    );
}
