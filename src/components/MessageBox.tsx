import { useState, useRef, useMemo } from "preact/hooks";
import styles from "./MessageBox.module.scss";
import { IconButton, Spinner } from ".";

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

    const isValidMessage = useMemo(() => {
        return value.trim() !== "";
    }, [value]);

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
        if (isValidMessage && !event.shiftKey && event.key === "Enter") {
            onSubmit();
        }
    }

    /**
     * Send message if message is valid and reset height after
     */
    async function onSubmit() {
        setSending(true);

        await onMessageSubmit();

        textarea.current!.style.height = "inherit";

        setSending(false);
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
            {sending ? (
                <Spinner size="sm" />
            ) : (
                <IconButton
                    icon={["fas", "paper-plane"]}
                    color="green"
                    disabled={disabled || !isValidMessage}
                    onClick={onSubmit}
                />
            )}
        </div>
    );
}
