import styles from "./SubHeading.module.scss";

export interface SubHeadingProps {
    className?: string;
    children: string;
}

export function SubHeading({ className, children }: SubHeadingProps) {
    return (
        <h2 class={`${styles.subHeading} ${className || ""} `}>{children}</h2>
    );
}
