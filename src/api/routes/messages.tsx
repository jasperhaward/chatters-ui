import type { Message } from "@types";
import { messages } from "../mockData";

export async function get() {
    return new Promise<Message[]>((resolve) => {
        setTimeout(() => resolve(messages), 1000);
    });
}
