export function generateId() {
    return crypto.randomUUID();
}

export function filterBy<T, K extends keyof T>(
    key: K,
    query: string,
    ...args: T[K] extends string ? [] : [(value: T[K]) => string]
) {
    const [valueFormatter] = args;

    return (item: T) => {
        let value = item[key];
        let formattedValue: string;

        if (valueFormatter) {
            formattedValue = valueFormatter(value);
        } else {
            formattedValue = value;
        }

        return formattedValue.toUpperCase().includes(query.toUpperCase());
    };
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
