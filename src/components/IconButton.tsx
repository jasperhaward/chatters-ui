import styles from "./IconButton.module.scss";
import { Icon, IconTuple } from ".";

type BaseButtonElementProps = Omit<
    JSX.HTMLAttributes<HTMLButtonElement>,
    "icon" | "size"
>;

export type IconButtonColor =
    | "green"
    | "white"
    | "grey"
    | "grey-dark"
    | "grey-xdark";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends BaseButtonElementProps {
    icon: IconTuple;
    color?: IconButtonColor;
    size?: IconButtonSize;
}

export function IconButton({
    icon,
    color = "green",
    size = "md",
    className,
    ...props
}: IconButtonProps) {
    return (
        <button
            className={`${styles.iconButton} ${styles[color]} ${styles[size]} ${
                className || ""
            }`}
            {...props}
        >
            <Icon icon={icon} />
        </button>
    );
}
