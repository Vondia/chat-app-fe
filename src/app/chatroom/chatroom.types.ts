export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface Message {
    message: string;
    time: string;
    user: User;
}

export interface Chatroom {
    id: string;
    name: string;
    users: User[];
    messages: Message[];
}