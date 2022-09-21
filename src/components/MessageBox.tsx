import { useMemo, useRef } from "preact/hooks";
import styles from "./MessageBox.module.scss";
import { Icon, Spinner } from ".";

export interface MessageBoxProps {
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    maxHeight: number;
    onInput: (event: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => Promise<void>;
}

export function MessageBox({
    name,
    value,
    loading,
    disabled,
    maxHeight,
    ...props
}: MessageBoxProps) {
    const textarea = useRef<HTMLTextAreaElement>(null);

    function onInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
        const textareaElement = textarea.current!;

        if (textareaElement.scrollHeight <= maxHeight) {
            textareaElement.style.height = "inherit";
            textareaElement.style.height = `${textareaElement.scrollHeight}px`;
        }

        props.onInput(event);
    }

    /**
     * Handle message submission if Enter key is pressed
     */
    function onKeyPress(event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) {
        if (!event.shiftKey && event.key === "Enter") {
            onSubmit();
        }
    }

    /**
     * Submit message if valid and reset height after message submission
     */
    async function onSubmit() {
        const isValidMessage = value.trim() !== "";

        if (isValidMessage) {
            await props.onSubmit();

            const textareaElement = textarea.current!;

            textareaElement.style.height = "inherit";
        }
    }

    return (
        <div className={styles.messageBox}>
            <textarea
                ref={textarea}
                placeholder="Type a message..."
                autoComplete="off"
                rows={1}
                name={name}
                value={value}
                disabled={disabled || loading}
                onInput={onInput}
                onKeyPress={onKeyPress}
            />
            <button disabled={disabled || loading} onClick={onSubmit}>
                {loading ? (
                    <Spinner size="sm" />
                ) : (
                    <Icon icon={["fas", "paper-plane"]} />
                )}
            </button>
        </div>
    );
}
