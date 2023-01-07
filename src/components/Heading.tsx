import styles from "./Heading.module.scss";

export interface HeadingProps {
    className?: string;
    children: string;
}

export function Heading({ className, children }: HeadingProps) {
    return <h1 class={`${styles.heading} ${className || ""} `}>{children}</h1>;
}
