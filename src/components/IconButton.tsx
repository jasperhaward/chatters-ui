import styles from "./IconButton.module.scss";
import { Button, Icon, IconProps } from ".";

type ButtonElementProps = Omit<
    JSX.HTMLAttributes<HTMLButtonElement>,
    keyof IconProps
>;

export type IconButtonProps = ButtonElementProps & IconProps;

export function IconButton({
    className,
    icon,
    color,
    size,
    ...props
}: IconButtonProps) {
    return (
        <Button
            className={`${styles.iconButton} ${className || ""}`}
            {...props}
        >
            <Icon size={size} color={color} icon={icon} />
        </Button>
    );
}
