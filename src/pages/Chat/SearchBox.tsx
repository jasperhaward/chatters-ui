import { Input, InputGroup, IconButton, Icon } from "@components";

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
        <InputGroup>
            <Input
                placeholder="Search"
                autoComplete="off"
                name={name}
                value={value}
                disabled={disabled}
                onInput={onInput}
            />
            {value === "" ? (
                <Icon icon={["fas", "search"]} />
            ) : (
                <IconButton icon={["fas", "times"]} onClick={onClearClick} />
            )}
        </InputGroup>
    );
}
