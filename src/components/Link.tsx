import { ComponentChildren } from "preact";
import { Link as WouterLink } from "wouter-preact";
import styles from "./Link.module.scss";

export interface LinkProps {
  className?: string;
  color: "ghost";
  to: string;
  children: ComponentChildren;
}

export function Link({ className = "", color, to, children }: LinkProps) {
  return (
    <WouterLink className={`${styles[color]} ${className}`} to={to}>
      {children}
    </WouterLink>
  );
}
