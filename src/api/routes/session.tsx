import type { Session } from "@types";
import { user } from "../mockData";

export async function load() {
    return new Promise<Session>((resolve) => {
        const session = {
            user,
        };

        setTimeout(() => resolve(session), 1000);
    });
}
