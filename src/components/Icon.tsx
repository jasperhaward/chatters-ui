import { createElement } from "preact";
import {
    IconPrefix,
    IconName,
    icon as factory,
} from "@fortawesome/fontawesome-svg-core";
import styles from "./Icon.module.scss";

export type IconColor = "green" | "white" | "grey" | "grey-dark" | "grey-xdark";

export type IconSize = "sm" | "md" | "lg" | "xl";

export type IconTuple = [IconPrefix, IconName];

export interface IconProps {
    size?: IconSize;
    color?: IconColor;
    icon: IconTuple;
}

export function Icon({
    size = "md",
    color = "green",
    icon: [prefix, iconName],
}: IconProps) {
    const icon = factory({ prefix, iconName });

    if (icon) {
        const [element] = icon.abstract;

        const children = element.children!.map((child) =>
            createElement(child.tag, child.attributes)
        );

        const elementProps = {
            ...element.attributes,
            class: `${element.attributes.class} ${styles[color]} ${styles[size]}`,
        };

        return createElement(element.tag, elementProps, children);
    } else {
        throw new Error(`Icon '${iconName}' not in library '${prefix}'.`);
    }
}
