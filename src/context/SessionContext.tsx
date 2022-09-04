import { createContext } from "preact";
import type { Session } from "@types";

export type TSessionContext = [
    session: Session | undefined,
    loadSession: (session: Session) => void
];

export const SessionContext = createContext<TSessionContext>(null as any);
