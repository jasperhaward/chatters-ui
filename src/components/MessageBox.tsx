import { useState, useRef } from "preact/hooks";
import styles from "./MessageBox.module.scss";
import { Icon, Spinner } from ".";

export interface MessageBoxProps {
    name: string;
    value: string;
    disabled: boolean;
    maxHeight: number;
    onInput: (event: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
    onMessageSubmit: () => Promise<void>;
}

export function MessageBox({
    name,
    value,
    disabled,
    maxHeight,
    onMessageSubmit,
    ...props
}: MessageBoxProps) {
    const [sending, setSending] = useState(false);

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
     * Send message if Enter key is pressed
     */
    function onKeyPress(event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) {
        if (!event.shiftKey && event.key === "Enter") {
            onSubmit();
        }
    }

    /**
     * Send message if message is valid and reset height after
     */
    async function onSubmit() {
        const isValidMessage = value.trim() !== "";

        if (isValidMessage) {
            setSending(true);

            await onMessageSubmit();

            textarea.current!.style.height = "inherit";

            setSending(false);
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
                disabled={disabled || sending}
                onInput={onInput}
                onKeyPress={onKeyPress}
            />
            <button disabled={disabled || sending} onClick={onSubmit}>
                {sending ? (
                    <Spinner size="sm" />
                ) : (
                    <Icon icon={["fas", "paper-plane"]} />
                )}
            </button>
        </div>
    );
}
