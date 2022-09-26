import { createElement } from "preact";
import {
    IconPrefix,
    IconName,
    icon as factory,
} from "@fortawesome/fontawesome-svg-core";

export type IconTuple = [IconPrefix, IconName];

export interface IconProps {
    icon: IconTuple;
}

export function Icon(props: IconProps) {
    const [prefix, iconName] = props.icon;

    const icon = factory({ prefix, iconName });

    if (icon) {
        const [element] = icon.abstract;

        const children = element.children!.map((child) =>
            createElement(child.tag, child.attributes)
        );

        return createElement(element.tag, element.attributes, children);
    } else {
        throw new Error(`Icon '${iconName}' not in library.`);
    }
}
