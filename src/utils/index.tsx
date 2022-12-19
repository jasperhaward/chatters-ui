export function generateId() {
    return crypto.randomUUID();
}

export function sortAlphabeticallyBy<T>(key: keyof T) {
    return (a: T, b: T) => {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        }

        return 0;
    };
}

export * from "./colours";
