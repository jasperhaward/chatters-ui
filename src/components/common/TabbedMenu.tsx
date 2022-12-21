import styles from "./TabbedMenu.module.scss";

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
            {options.map((option) => {
                const isSelected = option === selected;

                return (
                    <button
                        key={option}
                        className={isSelected ? styles.selected : undefined}
                        onClick={() => onSelect(option)}
                    >
                        <div>{option}</div>
                        {isSelected && <div className={styles.indicator} />}
                    </button>
                );
            })}
        </div>
    );
}
