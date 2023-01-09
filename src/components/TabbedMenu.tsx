import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import styles from "./TabbedMenu.module.scss";

import { Button } from "@components";

export interface TabbedMenuItemProps<T> {
    value: T;
    disabled?: boolean;
    selected: boolean;
    onClick: (view: T) => void;
}

export function TabbedMenuItem<T extends string>({
    value,
    disabled,
    selected,
    onClick,
}: TabbedMenuItemProps<T>) {
    return (
        <Button
            className={`${styles.menuItem} ${selected ? styles.selected : ""}`}
            disabled={disabled}
            onClick={() => onClick(value)}
        >
            <div>{value}</div>
            {selected && <div className={styles.indicator} />}
        </Button>
    );
}

export interface TabbedViewOption<T> {
    title: T;
    component: ComponentChildren;
    disabled?: boolean;
}

export interface TabbedViewProps<T> {
    view: T;
    options: TabbedViewOption<T>[];
    onSelect: (view: T) => void;
}

export function TabbedView<T extends string>({
    view,
    options,
    onSelect,
}: TabbedViewProps<T>) {
    const selectedOption = useMemo(() => {
        return options.find((option) => {
            return option.title === view;
        })!;
    }, [view, options]);

    return (
        <>
            <div className={styles.menu}>
                {options.map((option) => (
                    <TabbedMenuItem
                        key={option.title}
                        value={option.title}
                        disabled={option.disabled}
                        selected={option === selectedOption}
                        onClick={onSelect}
                    />
                ))}
            </div>
            {selectedOption.component}
        </>
    );
}
