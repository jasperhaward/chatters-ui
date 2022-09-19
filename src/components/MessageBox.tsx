import { useMemo } from "preact/hooks";
import { Icon, Spinner } from ".";
import styles from "./MessageBox.module.scss";

export interface MessageBoxProps {
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

export function MessageBox({
    name,
    value,
    loading,
    disabled,
    onInput,
    onSubmit,
}: MessageBoxProps) {
    const isValidMessage = useMemo(() => {
        return value.trim() !== "";
    }, [value]);

    return (
        <form
            className={styles.messageBox}
            onSubmit={isValidMessage ? onSubmit : undefined}
        >
            <input
                placeholder="Type a message..."
                autoComplete="off"
                name={name}
                value={value}
                disabled={disabled || loading}
                onInput={onInput}
            />
            <button
                disabled={disabled || loading || !isValidMessage}
                onClick={onSubmit}
            >
                {loading ? (
                    <Spinner size="sm" />
                ) : (
                    <Icon icon={["fas", "paper-plane"]} />
                )}
            </button>
        </form>
    );
}
