import { Icon, Spinner } from ".";
import styles from "./MessageBox.module.scss";

export interface MessageBoxProps {
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export function MessageBox({
    name,
    value,
    loading,
    disabled,
    onInput,
    onClick,
}: MessageBoxProps) {
    return (
        <div className={styles.messageBox}>
            <input
                placeholder="Type a message..."
                autoComplete="off"
                name={name}
                value={value}
                disabled={disabled || loading}
                onInput={onInput}
            />
            <button disabled={!value.trim() || loading} onClick={onClick}>
                {loading ? (
                    <Spinner size="sm" />
                ) : (
                    <Icon icon={["fas", "paper-plane"]} />
                )}
            </button>
        </div>
    );
}
