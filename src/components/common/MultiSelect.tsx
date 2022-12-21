import { useMemo, useState } from "preact/hooks";
import styles from "./MultiSelect.module.scss";
import { Pill, HighlightedText } from "..";
import { useForm } from "@hooks";

export interface MultiSelectOption {
    text: string;
    value: string;
}

export interface MultiSelectProps {
    value: MultiSelectOption[];
    options: MultiSelectOption[];
    disabled?: boolean;
    placeholder?: string;
    onOptionAdd: (option: MultiSelectOption) => void;
    onOptionRemove: (option: MultiSelectOption) => void;
}

export function MultiSelect({
    value,
    options,
    disabled,
    placeholder,
    ...props
}: MultiSelectProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [inputs, onInput, setInputs] = useForm({
        search: "",
    });

    const filteredOptions = useMemo(() => {
        if (inputs.search === "") {
            return options;
        }

        return options.filter((option) => {
            const searchTerm = inputs.search.toUpperCase();
            const text = option.text.toUpperCase();

            return text.includes(searchTerm);
        });
    }, [options]);

    function onOptionAdd(option: MultiSelectOption) {
        setInputs({ search: "" });
        props.onOptionAdd(option);
    }

    function onOptionRemove(option: MultiSelectOption) {
        setInputs({ search: "" });
        props.onOptionRemove(option);
    }

    return (
        <div className={styles.multiSelect}>
            <div className={styles.selected}>
                {value.map((option, index) => (
                    <Pill key={index} onClick={() => onOptionRemove(option)}>
                        {option.text}
                    </Pill>
                ))}
            </div>
            <input
                name="search"
                placeholder={placeholder}
                autoComplete="off"
                value={inputs.search}
                onInput={onInput}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
            />
            {showOptions && (
                <div className={styles.options}>
                    {filteredOptions.map((option, index) => (
                        <button key={index} onClick={() => onOptionAdd(option)}>
                            <HighlightedText
                                query={inputs.search}
                                value={option.text}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
