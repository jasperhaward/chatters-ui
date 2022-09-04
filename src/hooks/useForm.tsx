import { Reducer, useReducer } from "preact/hooks";

export interface FormEvent
    extends JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement> {
    currentTarget: HTMLInputElement;
}

export interface FormInputs {
    [key: string]: string | boolean;
}

export type Form<T> = [
    inputs: T,
    onInput: (event: FormEvent) => void,
    setInputs: (newState: Partial<T>) => void
];

export function useForm<T extends FormInputs>(initialState: T): Form<T> {
    const reducer: Reducer<T, Partial<T>> = (state, newState) => ({
        ...state,
        ...newState,
    });

    const [inputs, setInputs] = useReducer(reducer, initialState);

    function onInput(event: FormEvent) {
        const { name, value, checked, type } = event.currentTarget;

        if (type === "checkbox") {
            setInputs({ [name]: checked } as Partial<T>);
        } else {
            setInputs({ [name]: value } as Partial<T>);
        }
    }

    return [inputs, onInput, setInputs];
}
