import styles from "./Heading.module.scss";

export interface HeadingProps {
    className?: string;
    children: string;
}

export function Heading({ className, children }: HeadingProps) {
    return (
        <h1 className={`${styles.heading} ${className || ""} `}>{children}</h1>
    );
}
