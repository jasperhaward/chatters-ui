import styles from "./Input.module.scss";

export type InputProps = JSX.HTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input className={`${styles.input} ${className || ""}`} {...props} />
    );
}
