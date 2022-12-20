import type { User } from "@types";
import { response, contacts } from "../mockData";

async function getContacts(): Promise<User[]> {
    return response(contacts, 2000);
}

export default {
    get: getContacts,
};
