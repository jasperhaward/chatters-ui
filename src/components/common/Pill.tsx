import { ComponentChildren } from "preact";
import styles from "./Pill.module.scss";
import { IconButton, Spinner, SpinnerContainer } from "..";

export interface PillProps {
    disabled?: boolean;
    spinner?: boolean;
    onClick: () => void;
    children: ComponentChildren;
}

export function Pill({ disabled, spinner, onClick, children }: PillProps) {
    return (
        <div className={styles.pill}>
            <span>{children}</span>
            {spinner ? (
                <SpinnerContainer>
                    <Spinner size="xs" color="grey-xdark" />
                </SpinnerContainer>
            ) : (
                <IconButton
                    icon={["fas", "times"]}
                    disabled={disabled}
                    size="sm"
                    color="grey-xdark"
                    onClick={onClick}
                />
            )}
        </div>
    );
}
