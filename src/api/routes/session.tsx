import type { Session } from "@types";
import { response, user } from "../mockData";

async function getSession(): Promise<Session> {
    return response({ user }, 1500);
}

export default {
    get: getSession,
};
