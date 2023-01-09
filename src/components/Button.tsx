import { forwardRef, Ref } from "preact/compat";
import styles from "./Button.module.scss";

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    color?: "green";
}

function ButtonComponent(
    { className, color, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>
) {
    return (
        <button
            className={`${styles.button} ${color ? styles[color] : ""} ${
                className || ""
            }`}
            ref={ref}
            {...props}
        />
    );
}

export const Button = forwardRef(ButtonComponent);
