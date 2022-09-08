export interface User {
    id: string;
    username: string;
    status: string;
}

export interface UserWithMeta extends User {
    backgroundColor: string;
}
