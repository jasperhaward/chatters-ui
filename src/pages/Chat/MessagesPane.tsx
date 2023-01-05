import { useEffect, useRef } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import styles from "./MessagesPane.module.scss";

import { Timestamp } from "@components";
import colours from "@styling/_colours.module.scss";
import { useCurrentUser } from "@hooks";
import { Conversation, Message as IMessage } from "@types";

import Message from "./Message";

export interface MessagesPaneProps {
    selectedConversation: Conversation;
}

export default function MessagesPane({
    selectedConversation,
}: MessagesPaneProps) {
    const user = useCurrentUser();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedConversation]);

    /**
     * Determines whether a datestamp between messages should be shown.
     * @param prevMessage
     * @param message
     * @returns true if:
     *  - there is no `prevMessage` or;
     *  - `message` & `prevMessage` were sent on different days
     */
    function displayDatestamp(
        prevMessage: IMessage | undefined,
        message: IMessage
    ) {
        return !prevMessage || !isSameDay(message, prevMessage);
    }

    /**
     * Determines whether a message's author should be displayed.
     * @param prevMessage
     * @param message
     * @returns true if:
     *  - `message` was not created by the current user
     *
     *  and
     *
     *  - there is no `prevMessage` or;
     *  - `message` & `prevMessage` were created by different users
     */
    function displayAuthor(
        prevMessage: IMessage | undefined,
        message: IMessage
    ) {
        if (message.createdBy.id !== user.id) {
            return !prevMessage || message.createdBy !== prevMessage.createdBy;
        }

        return false;
    }

    /**
     * Determines whether a message's timestamp should be displayed.
     * @param message
     * @param nextMessage
     * @returns true if:
     *  - there is no `nextMessage` or;
     *  - `message` and `nextMessage` were created by different users or;
     *  - `message` and `nextMessage` were sent more than 5 minutes apart
     */
    function displayTimestamp(
        message: IMessage,
        nextMessage: IMessage | undefined
    ) {
        return (
            !nextMessage ||
            message.createdBy !== nextMessage.createdBy ||
            !isWithinFiveMins(message, nextMessage)
        );
    }

    /**
     * Determines whether a message should have a small top/bottom border radius.
     * @param a
     * @param b
     * @returns true if:
     *  - both `a` and `b` are defined and;
     *  - both `a` and `b` were created less than 5 minutes apart and;
     *  - both `a` and `b` were created by the same user
     */
    function displayPointed(a: IMessage | undefined, b: IMessage | undefined) {
        return (
            !!a &&
            !!b &&
            isWithinFiveMins(a, b) &&
            a.createdBy.id === b.createdBy.id
        );
    }

    function backgroundColour(message: IMessage) {
        if (message.createdBy.id === user.id) {
            return colours.green;
        } else {
            return colours.magenta;
        }
    }

    function isWithinFiveMins(a: IMessage, b: IMessage) {
        const createdAt = {
            a: new Date(a.createdAt).getTime(),
            b: new Date(b.createdAt).getTime(),
        };

        return Math.abs(createdAt.a - createdAt.b) <= 5 * 60 * 1000;
    }

    function isSameDay(a: IMessage, b: IMessage) {
        const createdAt = {
            a: new Date(a.createdAt),
            b: new Date(b.createdAt),
        };

        return (
            createdAt.a.getFullYear() === createdAt.b.getFullYear() &&
            createdAt.a.getMonth() === createdAt.b.getMonth() &&
            createdAt.a.getDate() === createdAt.b.getDate()
        );
    }

    return (
        <>
            {selectedConversation.messages
                .slice()
                .reverse() // needed as messages are ordered most recent first
                .map((message, index, messages) => ({
                    ...message,
                    prev: messages[index - 1],
                    next: messages[index + 1],
                }))
                .map(({ prev, next, ...message }) => (
                    <Fragment key={message.id}>
                        {displayDatestamp(prev, message) && (
                            <Timestamp
                                className={styles.datestamp}
                                timestamp={message.createdAt}
                                time={false}
                            />
                        )}
                        <Message
                            message={message}
                            meta={{
                                alignRight: message.createdBy.id === user.id,
                                backgroundColor: backgroundColour(message),
                                showAuthor: displayAuthor(prev, message),
                                showTimestamp: displayTimestamp(message, next),
                                pointedTop: displayPointed(prev, message),
                                pointedBottom: displayPointed(message, next),
                            }}
                        />
                    </Fragment>
                ))}
            <div ref={ref} />
        </>
    );
}
