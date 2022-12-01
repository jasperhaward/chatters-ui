import type { Reducer } from "preact/hooks";
import type { User } from "@types";
import type { AppContextAction } from "../AppContext";

const contacts: Reducer<User[], AppContextAction> = (state, action) => {
    switch (action.type) {
        case "contacts/append":
            return [...state, ...action.payload];
        default:
            return state;
    }
};

export default contacts;
