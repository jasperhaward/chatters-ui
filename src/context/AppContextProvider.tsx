import type { ComponentChildren } from "preact";
import { Reducer, useReducer } from "preact/hooks";

import { AppContext, AppContextState, AppContextAction } from ".";
import contacts from "./reducers/contacts";
import conversations from "./reducers/conversations";

export interface AppContextProviderProps {
    children: ComponentChildren;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const reducer: Reducer<AppContextState, AppContextAction> = (
        state,
        action
    ) => ({
        contacts: contacts(state.contacts, action),
        conversations: conversations(state.conversations, action),
    });

    const [state, dispatch] = useReducer(reducer, {
        contacts: [],
        conversations: [],
    });

    return (
        <AppContext.Provider value={[state, dispatch]} children={children} />
    );
}
