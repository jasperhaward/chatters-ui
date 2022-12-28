import styles from "./TabbedMenu.module.scss";

export interface TabbedMenuItemProps<T> {
    value: T;
    isSelected: boolean;
    onClick: (view: T) => void;
}

export function TabbedMenuItem<T extends string>({
    value,
    isSelected,
    onClick,
}: TabbedMenuItemProps<T>) {
    return (
        <button
            className={`${styles.menuItem} ${
                isSelected ? styles.selected : ""
            }`}
            onClick={() => onClick(value)}
        >
            <div>{value}</div>
            {isSelected && <div className={styles.indicator} />}
        </button>
    );
}

export interface TabbedMenuProps<T> {
    selected: T;
    options: T[];
    onSelect: (view: T) => void;
}

export function TabbedMenu<T extends string>({
    selected,
    options,
    onSelect,
}: TabbedMenuProps<T>) {
    return (
        <div className={styles.menu}>
            {options.map((option) => (
                <TabbedMenuItem
                    key={option}
                    value={option}
                    isSelected={option === selected}
                    onClick={onSelect}
                />
            ))}
        </div>
    );
}
