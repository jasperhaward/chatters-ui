import { useContext, useEffect, useMemo } from "preact/hooks";
import { useLocation } from "wouter";
import styles from "./Chat.module.scss";

import * as api from "@api";
import { AppContext, SessionContext } from "@context";
import { useForm } from "@hooks";
import { Conversation, User } from "@types";
import {
    SearchBox,
    ConversationsPane,
    MessagesPane,
    ConversationHeader,
    MessageBox,
    Spinner,
    SpinnerContainer,
} from ".";

export interface ChatProps {
    params: {
        id?: string;
    };
}

export function Chat({ params }: ChatProps) {
    const [{ conversations }, dispatch] = useContext(AppContext);
    const [session, setSession] = useContext(SessionContext);

    const [location, setLocation] = useLocation();
    const [inputs, onInput, setInputs] = useForm({
        search: "",
        message: "",
    });

    useEffect(() => {
        async function load() {
            try {
                const session = await api.session.load();
                const conversations = await api.conversations.get();

                dispatch({
                    type: "conversations/append",
                    payload: conversations,
                });
                setSession(session);
            } catch (e) {
                console.error(e);
            }
        }

        load();
    }, []);

    const selectedConversation = useMemo(() => {
        if (conversations.length > 0 && params.id) {
            return conversations.find(
                (conversation) => conversation.id === params.id
            );
        }
    }, [conversations, params.id]);

    useEffect(() => {
        if (conversations.length > 0 && !selectedConversation) {
            setLocation(`/conversations/${conversations[0].id}`);
        }
    }, [conversations, selectedConversation]);

    function onSearchClear() {
        setInputs({ search: "" });
    }

    function onConversationClick(conversation: Conversation) {
        setLocation(`/conversations/${conversation.id}`);
        setInputs({ message: "" });
    }

    async function onRecipientAdd(recipient: User) {}

    async function onRecipientRemove(recipient: User) {}

    async function onMessageSubmit() {
        const params = {
            content: inputs.message.trim(),
            conversationId: selectedConversation!.id,
            createdBy: session!.user.id,
        };

        const message = await api.messages.create(params);

        dispatch({
            type: "conversations/messages/prepend",
            payload: {
                conversationId: selectedConversation!.id,
                messages: [message],
            },
        });
        setInputs({ message: "" });
    }

    return (
        <div className={styles.chat}>
            <h1>Chat</h1>
            <main>
                <section className={styles.conversations}>
                    <SearchBox
                        name="search"
                        value={inputs.search}
                        disabled={conversations.length === 0}
                        onInput={onInput}
                        onClearClick={onSearchClear}
                    />
                    {!selectedConversation ? (
                        <SpinnerContainer>
                            <Spinner />
                        </SpinnerContainer>
                    ) : (
                        <ConversationsPane
                            search={inputs.search}
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onConversationClick={onConversationClick}
                        />
                    )}
                </section>
                <section className={styles.messages}>
                    {!selectedConversation ? (
                        <SpinnerContainer>
                            <Spinner />
                        </SpinnerContainer>
                    ) : (
                        <>
                            <ConversationHeader
                                selectedConversation={selectedConversation}
                                onRecipientAdd={onRecipientAdd}
                                onRecipientRemove={onRecipientRemove}
                            />
                            <MessagesPane
                                selectedConversation={selectedConversation}
                            />
                        </>
                    )}
                    <MessageBox
                        name="message"
                        value={inputs.message}
                        disabled={!selectedConversation}
                        maxHeight={80}
                        onInput={onInput}
                        onMessageSubmit={onMessageSubmit}
                    />
                </section>
            </main>
        </div>
    );
}
