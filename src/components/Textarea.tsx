import { createRef } from "preact";
import styles from "./Textarea.module.scss";

type TextareaElementProps = Omit<
    JSX.HTMLAttributes<HTMLTextAreaElement>,
    "onInput" | "ref"
>;

export interface TextareaProps extends TextareaElementProps {
    maxHeight: number;
    validate?: (value: string) => boolean;
    onEnterPress?: () => void | Promise<void>;
    onInput: (event: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
    className,
    maxHeight,
    validate,
    onEnterPress,
    onInput,
    ...props
}: TextareaProps) {
    const textarea = createRef<HTMLTextAreaElement>();

    function onInputWithResize(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
        const textareaElement = textarea.current!;

        if (textareaElement.scrollHeight <= maxHeight) {
            textareaElement.style.height = "inherit";
            textareaElement.style.height = `${textareaElement.scrollHeight}px`;
        }

        onInput(event);
    }

    /**
     * Handle enter being pressed. Resets the textarea height after onEnter has been called.
     */
    async function onKeyPress(
        event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>
    ) {
        if (!event.shiftKey && event.key === "Enter" && onEnterPress) {
            if (validate && !validate(event.currentTarget.value)) {
                return;
            }

            await onEnterPress();

            textarea.current!.style.height = "inherit";
        }
    }

    return (
        <textarea
            {...props}
            ref={textarea}
            className={`${styles.textarea} ${className || ""}`}
            onInput={onInputWithResize}
            onKeyPress={onKeyPress}
        />
    );
}
