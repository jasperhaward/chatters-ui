import { useState } from "preact/hooks";

import { IconButton, InputGroup, Textarea, Spinner } from "@components";

export interface MessageBoxProps {
    name: string;
    value: string;
    disabled: boolean;
    onInput: (event: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
    onMessageSubmit: () => Promise<void>;
}

export default function MessageBox({
    name,
    value,
    disabled,
    onInput,
    onMessageSubmit,
}: MessageBoxProps) {
    const [sending, setSending] = useState(false);

    function isValidMessage(value: string) {
        return value.trim() !== "";
    }

    async function onSubmit() {
        setSending(true);

        await onMessageSubmit();

        setSending(false);
    }

    return (
        <InputGroup>
            <Textarea
                placeholder="Type a message..."
                autoComplete="off"
                rows={1}
                maxHeight={80}
                name={name}
                value={value}
                validate={isValidMessage}
                disabled={disabled || sending}
                onInput={onInput}
                onEnterPress={onSubmit}
            />
            {sending ? (
                <Spinner size="sm" />
            ) : (
                <IconButton
                    icon={["fas", "paper-plane"]}
                    disabled={disabled || !isValidMessage(value)}
                    onClick={onSubmit}
                />
            )}
        </InputGroup>
    );
}
