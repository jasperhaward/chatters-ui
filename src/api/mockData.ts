import { User, Conversation, Message } from "@types";

export function generateId() {
    var arr = new Uint8Array(40 / 2);
    crypto.getRandomValues(arr);

    const dec2hex = (dec: number) => dec.toString(16).padStart(2, "0");

    return Array.from(arr, dec2hex).join("");
}

export const user: User = {
    id: generateId(),
    username: "Jasper Haward",
    status: "Hello all",
};

export const recipient1: User = {
    id: generateId(),
    username: "Monika Rahne",
    status: "Hello 1",
};

export const recipient2: User = {
    id: generateId(),
    username: "Benedict Ng",
    status: "Hello 1",
};

export const recipient3: User = {
    id: generateId(),
    username: "Tim Bracken",
    status: "Hello 2",
};

export const recipient4: User = {
    id: generateId(),
    username: "John Trollop",
    status: "Hello 3",
};

export const recipient5: User = {
    id: generateId(),
    username: "Alasdair Dibben",
    status: "Hello 4",
};

const now = new Date();

export const conversations: Conversation[] = [
    {
        id: "C-1",
        recipients: [recipient1, recipient2],
        messages: [
            {
                id: generateId(),
                conversationId: "C-1",
                content: "Today we get 3K elo!",
                createdAt: now.toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C-1",
                content: "Lets go lads",
                createdAt: now.toISOString(),
                createdBy: recipient2,
            },
        ],
    },
    {
        id: "C0",
        recipients: [recipient1, recipient2, recipient3, recipient4],
        messages: [
            {
                id: generateId(),
                conversationId: "C0",
                content: "How is everyone doing?!",
                createdAt: new Date(
                    now.getTime() - 1000 * 60 * 60 * 30
                ).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Hello guys!",
                createdAt: new Date(2022, 0, 3, 15, 38).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Whats occuring",
                createdAt: new Date(2022, 0, 3, 14, 59).toISOString(),
                createdBy: recipient2,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Will see you soon",
                createdAt: new Date(2022, 0, 3, 15, 12).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Hope you all had a good new year",
                createdAt: new Date(2022, 0, 3, 15, 11).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Hello all!",
                createdAt: new Date(2022, 0, 3, 15, 11).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Hello Monika!",
                createdAt: new Date(2022, 0, 3, 14, 59).toISOString(),
                createdBy: recipient2,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Hello Hello Tim!",
                createdAt: new Date(2022, 0, 3, 11, 12).toISOString(),
                createdBy: recipient2,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Lorem ipsum....",
                createdAt: new Date(2022, 0, 3, 11, 15).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Lorem ipsum....",
                createdAt: new Date(2022, 0, 3, 12, 15).toISOString(),
                createdBy: recipient3,
            },
            {
                id: generateId(),
                conversationId: "C0",
                content: "Lorem ipsum 2....",
                createdAt: new Date(2022, 0, 3, 13, 15).toISOString(),
                createdBy: recipient4,
            },
        ],
    },
    {
        id: "C1",
        recipients: [recipient1],
        messages: [
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello!",
                createdAt: new Date(
                    now.getTime() - 1000 * 60 * 60 * 24 * 3
                ).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello!",
                createdAt: new Date(2021, 11, 7, 14, 36).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello!",
                createdAt: new Date(2021, 11, 7, 14, 36).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello!",
                createdAt: new Date(2021, 11, 7, 14, 36).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello!",
                createdAt: new Date(2021, 11, 7, 14, 36).toISOString(),
                createdBy: recipient1,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C1",
                content: "Hello Monika!",
                createdAt: new Date(2021, 11, 7, 13, 23).toISOString(),
                createdBy: user,
            },
        ],
    },
    {
        id: "C2",
        recipients: [recipient2],
        messages: [
            {
                id: generateId(),
                conversationId: "C2",
                content:
                    "This is a another really long mesasage....reallllyyyy longggg messsage for testing shit",
                createdAt: new Date(
                    now.getTime() - 1000 * 60 * 60 * 24 * 30
                ).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                createdAt: new Date(2021, 11, 6, 15, 22).toISOString(),
                createdBy: recipient2,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content: "This is a really long mesasage u cuck",
                createdAt: new Date(2021, 11, 6, 15, 25).toISOString(),
                createdBy: recipient2,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                createdAt: new Date(2021, 11, 6, 15, 12).toISOString(),
                createdBy: user,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content: "How are you?",
                createdAt: new Date(2021, 11, 6, 15, 12).toISOString(),
                createdBy: user,
            },
        ],
    },
    {
        id: "C3",
        recipients: [recipient3],
        messages: [
            {
                id: generateId(),
                conversationId: "C2",
                content: "Wagwan bro",
                createdAt: new Date(2021, 11, 2, 17, 12).toISOString(),
                createdBy: recipient3,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content: "Wagwan was going to ask about your shotgun",
                createdAt: new Date(2021, 10, 7, 18, 58).toISOString(),
                createdBy: recipient3,
            },
            {
                id: generateId(),
                conversationId: "C2",
                content: "This is a really long mesasage u cuck",
                createdAt: new Date(2021, 10, 7, 18, 55).toISOString(),
                createdBy: recipient3,
            },
        ],
    },
];

export const messages: Message[] = [
    {
        id: generateId(),
        conversationId: "C2",
        content: "Extra message 1",
        createdAt: new Date(2021, 11, 2, 17, 12).toISOString(),
        createdBy: user,
    },
    {
        id: generateId(),
        conversationId: "C2",
        content: "Extra message 3",
        createdAt: new Date(2021, 10, 7, 18, 58).toISOString(),
        createdBy: user,
    },
    {
        id: generateId(),
        conversationId: "C2",
        content: "Extra message 4",
        createdAt: new Date(2021, 10, 7, 18, 55).toISOString(),
        createdBy: user,
    },
];
