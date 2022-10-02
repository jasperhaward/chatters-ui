import styles from "./MultiSelect.module.scss";
import { Pill } from ".";
import { useForm } from "@hooks";

export interface MultiSelectOption {
    text: string;
    value: string;
}

export interface MultiSelectProps {
    value: MultiSelectOption[];
    options: MultiSelectOption[];
    disabled?: boolean;
    onOptionAdd: (option: MultiSelectOption) => void;
    onOptionRemove: (option: MultiSelectOption) => void;
}

export function MultiSelect({
    value,
    options,
    disabled,
    onOptionAdd,
    onOptionRemove,
}: MultiSelectProps) {
    const [inputs, onInput] = useForm({
        search: "",
    });

    return (
        <>
            <div className={styles.selected}>
                {value.map((option) => (
                    <Pill onClick={() => onOptionRemove(option)}>
                        {option.text}
                    </Pill>
                ))}
            </div>
            <div className={styles.search}>
                <input
                    name="search"
                    value={inputs.search}
                    disabled={disabled}
                    onInput={onInput}
                />
            </div>
            <select className={styles.results} size={4} disabled={disabled}>
                {options.map((option) => (
                    <option
                        value={option.value}
                        onClick={() => onOptionAdd(option)}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </>
    );
}
