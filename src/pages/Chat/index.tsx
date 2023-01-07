import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "preact/hooks";
import { useLocation } from "wouter";
import styles from "./index.module.scss";

import * as api from "@api";
import { AppContext, SessionContext } from "@context";
import {
    Spinner,
    SpinnerContainer,
    TabbedView,
    TabbedViewOption,
    ScrollableContainer,
    ScrollableContainerParent,
} from "@components";
import { DRAFT_CONVERSATION_ID } from "@constants";
import { useForm } from "@hooks";
import { Conversation, User } from "@types";

import ContactsView from "./ContactsView";
import ConversationsView from "./ConversationsView";
import RecipientsView from "./RecipientsView";
import MessagesPane from "./MessagesPane";
import MessagesPaneHeader from "./MessagesPaneHeader";
import SearchBox from "./SearchBox";
import MessageBox from "./MessageBox";

export enum View {
    Contacts = "Contacts",
    Conversations = "Conversations",
    Recipients = "Recipients",
}

export interface ChatProps {
    params: {
        id?: string;
    };
}

export default function Chat({ params }: ChatProps) {
    const [{ contacts, conversations }, dispatch] = useContext(AppContext);
    const [session, setSession] = useContext(SessionContext);

    const [view, setView] = useState<View>(View.Conversations);
    const [location, setLocation] = useLocation();
    const [inputs, onInput, setInputs] = useForm({
        search: "",
        message: "",
    });

    useEffect(() => {
        loadSession().catch(console.error);
        loadContacts().catch(console.error);
        loadConversations().catch(console.error);
    }, []);

    const selectedConversation = useMemo(() => {
        if (conversations.length > 0 && params.id) {
            return conversations.find((conversation) => {
                return conversation.id === params.id;
            });
        }
    }, [conversations, params.id]);

    useEffect(() => {
        if (conversations.length > 0 && !selectedConversation) {
            setLocation(`/conversations/${conversations[0].id}`);
        }
    }, [conversations, selectedConversation]);

    const isLoading = useMemo(() => {
        return !selectedConversation || !session || contacts.length === 0;
    }, [selectedConversation, session, contacts]);

    async function loadSession() {
        const session = await api.session.get();

        setSession(session);
    }

    async function loadContacts() {
        const contacts = await api.contacts.get();

        dispatch({
            type: "contacts/append",
            payload: contacts,
        });
    }

    async function loadConversations() {
        const conversations = await api.conversations.get();

        dispatch({
            type: "conversations/append",
            payload: conversations,
        });
    }

    function onSearchClear() {
        setInputs({ search: "" });
    }

    function onConversationClick(conversation: Conversation) {
        if (conversation.id !== selectedConversation!.id) {
            // when the currently selected conversation is a draft and the newly
            // selected conversation is not a draft, remove the draft conversation
            if (
                selectedConversation!.id === DRAFT_CONVERSATION_ID &&
                conversation.id !== DRAFT_CONVERSATION_ID
            ) {
                dispatch({
                    type: "conversations/remove",
                    payload: {
                        conversationId: DRAFT_CONVERSATION_ID,
                    },
                });
            }

            setLocation(`/conversations/${conversation.id}`);
            setInputs({ message: "" });
        }
    }

    async function onContactClick(contact: User) {
        /** Conversation where the sole recipient was the clicked contact */
        const existingConversation = conversations.find((conversation) => {
            return (
                conversation.recipients.length === 1 &&
                conversation.recipients[0].id === contact.id
            );
        });

        if (existingConversation) {
            onConversationClick(existingConversation);
        } else {
            const draftConversation: Conversation = {
                id: DRAFT_CONVERSATION_ID,
                recipients: [contact],
                messages: [],
            };

            // if the selected conversation is a draft conversation,
            // update it, as opposed to inserting a new draft conversation
            if (selectedConversation!.id === DRAFT_CONVERSATION_ID) {
                dispatch({
                    type: "conversations/replace",
                    payload: {
                        conversationId: DRAFT_CONVERSATION_ID,
                        conversation: draftConversation,
                    },
                });
            } else {
                dispatch({
                    type: "conversations/prepend",
                    payload: [draftConversation],
                });
            }
            onConversationClick(draftConversation);
        }

        setView(View.Conversations);
    }

    async function onRecipientAdd(recipient: User) {
        const params = {
            conversationId: selectedConversation!.id,
            recipientId: recipient.id,
        };

        await api.conversations.recipients.add(params);

        dispatch({
            type: "conversations/recipients/add",
            payload: {
                conversationId: selectedConversation!.id,
                recipient,
            },
        });
    }

    async function onRecipientRemove(recipient: User) {
        const params = {
            conversationId: selectedConversation!.id,
            recipientId: recipient.id,
        };

        await api.conversations.recipients.remove(params);

        dispatch({
            type: "conversations/recipients/remove",
            payload: {
                conversationId: selectedConversation!.id,
                recipient,
            },
        });
    }

    async function onMessageSubmit() {
        // if the selected conversation is a draft, create the conversation
        if (selectedConversation!.id === DRAFT_CONVERSATION_ID) {
            const [recipient] = selectedConversation!.recipients;

            const params = {
                recipientId: recipient.id,
                message: {
                    content: inputs.message.trim(),
                    userId: session!.user.id,
                },
            };

            const createdConversation = await api.conversations.create(params);

            dispatch({
                type: "conversations/replace",
                payload: {
                    conversationId: DRAFT_CONVERSATION_ID,
                    conversation: createdConversation,
                },
            });
            onConversationClick(createdConversation);
        } else {
            const params = {
                content: inputs.message.trim(),
                conversationId: selectedConversation!.id,
                userId: session!.user.id,
            };

            const message = await api.conversations.messages.send(params);

            dispatch({
                type: "conversations/messages/prepend",
                payload: {
                    conversationId: selectedConversation!.id,
                    messages: [message],
                },
            });
            setInputs({ message: "" });
        }
    }

    const viewOptions = useCallback(() => {
        const options: TabbedViewOption<View>[] = [
            {
                title: View.Conversations,
                component: (
                    <ConversationsView
                        conversations={conversations}
                        selectedConversation={selectedConversation!}
                        query={inputs.search}
                        onConversationClick={onConversationClick}
                    />
                ),
            },
            {
                title: View.Contacts,
                component: (
                    <ContactsView
                        contacts={contacts}
                        query={inputs.search}
                        onContactClick={onContactClick}
                    />
                ),
            },
            {
                title: View.Recipients,
                disabled: selectedConversation!.id === DRAFT_CONVERSATION_ID,
                component: (
                    <RecipientsView
                        selectedConversation={selectedConversation!}
                        contacts={contacts}
                        query={inputs.search}
                        onRecipientAdd={onRecipientAdd}
                        onRecipientRemove={onRecipientRemove}
                    />
                ),
            },
        ];

        return options;
    }, [inputs.search, conversations, contacts, selectedConversation]);

    return (
        <div className={styles.chat}>
            <h1>Chat</h1>
            <main>
                <ScrollableContainerParent className={styles.conversations}>
                    <SearchBox
                        name="search"
                        value={inputs.search}
                        disabled={isLoading}
                        onInput={onInput}
                        onClearClick={onSearchClear}
                    />
                    {isLoading ? (
                        <SpinnerContainer>
                            <Spinner />
                        </SpinnerContainer>
                    ) : (
                        <TabbedView
                            view={view}
                            options={viewOptions()}
                            onSelect={setView}
                        />
                    )}
                </ScrollableContainerParent>
                <ScrollableContainerParent className={styles.messages}>
                    {isLoading ? (
                        <SpinnerContainer>
                            <Spinner />
                        </SpinnerContainer>
                    ) : (
                        <>
                            <MessagesPaneHeader
                                selectedConversation={selectedConversation!}
                            />
                            <ScrollableContainer spacing="sm">
                                <MessagesPane
                                    selectedConversation={selectedConversation!}
                                />
                            </ScrollableContainer>
                        </>
                    )}
                    <MessageBox
                        name="message"
                        value={inputs.message}
                        disabled={isLoading}
                        maxHeight={80}
                        onInput={onInput}
                        onMessageSubmit={onMessageSubmit}
                    />
                </ScrollableContainerParent>
            </main>
        </div>
    );
}
