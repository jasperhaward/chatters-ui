import { useContext } from "preact/hooks";
import { SessionContext } from "@context";

export function useCurrentUser() {
    const [session] = useContext(SessionContext);

    if (!session) {
        throw new Error("useCurrentUser called before Session is defined.");
    }

    return session.user;
}
