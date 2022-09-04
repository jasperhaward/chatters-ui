import { Session } from "@types";
import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

import { SessionContext } from ".";

export interface SessionContextProviderProps {
    children: ComponentChildren;
}

export function SessionContextProvider({
    children,
}: SessionContextProviderProps) {
    const [session, setSession] = useState<Session>();

    return (
        <SessionContext.Provider
            value={[session, setSession]}
            children={children}
        />
    );
}
