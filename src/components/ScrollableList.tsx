import { ComponentChildren } from "preact";
import styles from "./ScrollableList.module.scss";

export interface ScrollableListrops {
    children: ComponentChildren;
}

export function ScrollableList({ children }: ScrollableListrops) {
    return <div className={styles.scrollableList}>{children}</div>;
}
