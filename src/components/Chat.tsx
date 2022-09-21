import { useContext, useEffect, useMemo, useReducer } from "preact/hooks";
import { useLocation } from "wouter";
import styles from "./Chat.module.scss";

import * as api from "@api";
import { AppContext, SessionContext } from "@context";
import {
    SearchBox,
    ConversationsPane,
    MessagesPane,
    ConversationHeader,
    MessageBox,
} from "@components";
import { useForm, useToggle } from "@hooks";
import { Conversation } from "@types";

export interface ChatProps {
    params: {
        id?: string;
    };
}

export function Chat({ params }: ChatProps) {
    const [{ conversations }, dispatch] = useContext(AppContext);
    const [session, loadSession] = useContext(SessionContext);

    const [_location, setLocation] = useLocation();
    const [inputs, onInput, setInputs] = useForm({
        search: "",
        message: "",
    });
    const [isSendingMessage, toggleIsSendingMessage] = useToggle(false);

    useEffect(() => {
        api.conversations
            .get()
            .then((conversations) => {
                dispatch({
                    type: "conversations/append",
                    payload: conversations,
                });
            })
            .catch(console.error);

        api.session.load().then(loadSession).catch(console.error);
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

    function onSearchClick() {
        setInputs({ search: "" });
    }

    function onConversationClick(conversation: Conversation) {
        setLocation(`/conversations/${conversation.id}`);
    }

    async function onMessageSubmit() {
        toggleIsSendingMessage();

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
        toggleIsSendingMessage();
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
                        onClick={onSearchClick}
                    />
                    <ConversationsPane
                        search={inputs.search}
                        session={session}
                        conversations={conversations}
                        selectedConversation={selectedConversation}
                        onConversationClick={onConversationClick}
                    />
                </section>
                <section className={styles.messages}>
                    <ConversationHeader
                        selectedConversation={selectedConversation}
                    />
                    <MessagesPane
                        session={session}
                        selectedConversation={selectedConversation}
                    />
                    <MessageBox
                        name="message"
                        value={inputs.message}
                        disabled={
                            !session ||
                            conversations.length === 0 ||
                            !selectedConversation
                        }
                        loading={isSendingMessage}
                        maxHeight={80}
                        onInput={onInput}
                        onSubmit={onMessageSubmit}
                    />
                </section>
            </main>
        </div>
    );
}
