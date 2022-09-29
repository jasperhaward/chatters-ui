export interface User {
    id: string;
    username: string;
}

export interface UserWithContacts extends User {
    contacts: User[];
}
