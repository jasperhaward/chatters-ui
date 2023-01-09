import { ComponentChildren } from "preact";
import { Link as WouterLink } from "wouter";
import styles from "./Link.module.scss";

interface LinkProps {
    className?: string;
    to: string;
    color?: "green" | "white";
    children: ComponentChildren;
}

export function Link({ className, color = "green", to, children }: LinkProps) {
    return (
        <WouterLink
            className={`${styles.link} ${styles[color]} ${className || ""} `}
            to={to}
        >
            {children}
        </WouterLink>
    );
}
