import styles from "./SearchBox.module.scss";

import { IconButton } from "@components";

export interface SearchBoxProps {
    name: string;
    value: string;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
    onClearClick: () => void;
}

export default function SearchBox({
    name,
    value,
    disabled,
    onInput,
    onClearClick,
}: SearchBoxProps) {
    return (
        <div className={styles.searchBox}>
            <input
                placeholder="Search"
                autoComplete="off"
                name={name}
                value={value}
                disabled={disabled}
                onInput={onInput}
            />
            <IconButton
                icon={["fas", value ? "times" : "search"]}
                disabled={!value}
                onClick={onClearClick}
            />
        </div>
    );
}
