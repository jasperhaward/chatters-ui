import { useState } from "preact/hooks";

export function useToggle(initialState: boolean): [boolean, () => void] {
    const [state, setState] = useState(initialState);

    function toggle() {
        setState((prev) => !prev);
    }

    return [state, toggle];
}
