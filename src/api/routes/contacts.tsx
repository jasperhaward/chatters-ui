import type { User } from "@types";
import { contacts } from "../mockData";

export async function get() {
    return new Promise<User[]>((resolve) => {
        setTimeout(() => resolve(contacts), 2000);
    });
}
