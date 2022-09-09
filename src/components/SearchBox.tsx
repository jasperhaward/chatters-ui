import { Icon } from ".";
import styles from "./SearchBox.module.scss";

export interface SearchBoxProps {
    name: string;
    value: string;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export function SearchBox({
    name,
    value,
    disabled,
    onInput,
    onClick,
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
            <button disabled={!value} onClick={onClick}>
                <Icon icon={["fas", value ? "times" : "search"]} />
            </button>
        </div>
    );
}
