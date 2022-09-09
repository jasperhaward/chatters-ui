import { useReducer } from "preact/hooks";

export type Toggle = [boolean, () => void];

export function useToggle(initialState: boolean): Toggle {
    return useReducer((prev) => !prev, initialState) as Toggle;
}
