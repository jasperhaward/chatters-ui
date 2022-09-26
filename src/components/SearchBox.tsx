import { IconButton } from ".";
import styles from "./SearchBox.module.scss";

export interface SearchBoxProps {
    name: string;
    value: string;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
    onClearClick: () => void;
}

export function SearchBox({
    name,
    value,
    disabled,
    onInput,
    onClearClick,
}: SearchBoxProps) {
    return (
        <div className={styles.searchBox}>
            <input
                placeholder="Search..."
                autoComplete="off"
                name={name}
                value={value}
                disabled={disabled}
                onInput={onInput}
            />
            <IconButton
                icon={["fas", value ? "times" : "search"]}
                color="green"
                disabled={!value}
                onClick={onClearClick}
            />
        </div>
    );
}
