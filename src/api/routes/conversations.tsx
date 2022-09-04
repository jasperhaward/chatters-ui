import type { Conversation } from "@types";
import { conversations } from "../mockData";

export async function get() {
    return new Promise<Conversation[]>((resolve) => {
        setTimeout(() => resolve(conversations), 1000);
    });
}
