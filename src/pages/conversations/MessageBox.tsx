import { Button, InputGroup, Icon, Textarea } from "@/components";

export interface MessageBoxProps {
  name: string;
  value: string;
  disabled: boolean;
  onInput: (value: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export default function MessageBox({
  name,
  value,
  disabled,
  onInput,
  onSubmit,
}: MessageBoxProps) {
  const isValueValid = value !== "";

  return (
    <InputGroup>
      <Textarea
        name={name}
        placeholder="Type a message..."
        maxHeight={175}
        disabled={disabled}
        value={value}
        onInput={onInput}
        onEnterPress={isValueValid ? onSubmit : undefined}
      />
      <Button
        color="ghost"
        disabled={disabled || !isValueValid}
        onClick={onSubmit}
      >
        <Icon icon={["fas", "paper-plane"]} />
      </Button>
    </InputGroup>
  );
}
