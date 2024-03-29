export interface User {
  id: string;
  username: string;
}

export interface UserWithCreatedAt extends User {
  createdAt: string;
}

export interface Recipient extends UserWithCreatedAt {
  conversationId: string;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  createdAt: string;
  createdBy: User;
}

export interface Conversation {
  id: string;
  createdAt: string;
  createdBy: User;
  title: string | null;
  recipients: Recipient[];
  latestMessage: Message | null;
}

export type ConversationWithoutRecipientsLatestMessage = Omit<
  Conversation,
  "recipients" | "latestMessage"
>;
