import styles from "./IconButton.module.scss";
import { Icon, IconTuple } from ".";

type HTMLButtonElementProps = JSX.HTMLAttributes<HTMLButtonElement>;

export interface IconButtonProps extends Omit<HTMLButtonElementProps, "icon"> {
    icon: IconTuple;
    color?: "green";
}

export function IconButton({
    icon,
    color,
    className,
    ...props
}: IconButtonProps) {
    return (
        <button
            className={`${styles.iconButton} ${color ? styles[color] : ""} ${
                className || ""
            }`}
            {...props}
        >
            <Icon icon={icon} />
        </button>
    );
}
