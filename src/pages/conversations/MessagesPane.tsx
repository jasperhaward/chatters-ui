import { useRef, useEffect, useMemo } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import {
  isSameDay,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  differenceInMinutes,
  format,
} from "date-fns";
import styles from "./MessagesPane.module.scss";

import { UseQuery } from "@/api";
import { Conversation, Message as IMessage } from "@/types";
import { useSession } from "@/features/auth";

import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";
import RetryableApiError from "./RetryableApiError";

export interface MessagesPaneProps {
  messages: UseQuery<IMessage[]>;
  selectedConversation: Conversation | undefined;
}

export default function MessagesPane({
  messages,
  selectedConversation,
}: MessagesPaneProps) {
  const [session] = useSession();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.data]);

  const layout = useMemo(() => {
    if (!messages.data) {
      return null;
    }

    return messages.data.slice().reverse().map(buildLayout);
  }, [messages.data]);

  function buildLayout(message: IMessage, index: number, messages: IMessage[]) {
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];

    const isCreatedByUser = message.createdBy.id === session.user.id;

    return {
      message,
      isCreatedByUser,
      isDisplayDatestamp: isDisplayDatestamp(prevMessage, message),
      isDisplayTimestamp: isDisplayTimestamp(message, nextMessage),
      isDisplayAuthor: isCreatedByUser
        ? false
        : isDisplayAuthor(prevMessage, message),
    };
  }

  /**
   * Determines whether a datestamp between messages should be shown.
   * @param prevMessage
   * @param message
   * @returns true if:
   *  - there is no `prevMessage` or;
   *  - `message` & `prevMessage` were sent on different days
   */
  function isDisplayDatestamp(
    prevMessage: IMessage | undefined,
    message: IMessage
  ) {
    return (
      !prevMessage ||
      !isSameDay(new Date(message.createdAt), new Date(prevMessage.createdAt))
    );
  }

  /**
   * Determines whether a message's (that wasn't created by the
   * current user) author & avatar should be displayed.
   * @param prevMessage
   * @param message
   * @returns true if:
   *  - there is no `prevMessage` or;
   *  - `message` & `prevMessage` were created by different users
   */
  function isDisplayAuthor(
    prevMessage: IMessage | undefined,
    message: IMessage
  ) {
    return !prevMessage || message.createdBy.id !== prevMessage.createdBy.id;
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
  function isDisplayTimestamp(
    message: IMessage,
    nextMessage: IMessage | undefined
  ) {
    return (
      !nextMessage ||
      message.createdBy.id !== nextMessage.createdBy.id ||
      Math.abs(
        differenceInMinutes(
          new Date(message.createdAt),
          new Date(nextMessage.createdAt)
        )
      ) > 5
    );
  }

  function formatDatestamp(timestamp: string) {
    const date = new Date(timestamp);

    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "EEEE");
    } else if (isThisYear(date)) {
      return format(date, "d LLLL");
    } else {
      return format(date, "d LLLL yyyy");
    }
  }

  return (
    <div className={styles.messagesPane}>
      {messages.isLoading ? (
        <>
          <MessageSkeleton isAlignRight width="40%" />
          <MessageSkeleton isAlignRight width="35%" />
          <MessageSkeleton isDisplayAvatar width="40%" />
          <MessageSkeleton isAlignRight width="45%" />
          <MessageSkeleton isDisplayAvatar width="35%" />
          <MessageSkeleton width="45%" />
          <MessageSkeleton isAlignRight width="35%" />
          <MessageSkeleton isDisplayAvatar width="40%" />
          <MessageSkeleton width="35%" />
        </>
      ) : messages.error ? (
        <RetryableApiError onRetryClick={messages.retry}>
          Failed to load messages, please try again.
        </RetryableApiError>
      ) : selectedConversation && messages.data.length === 0 ? (
        <time className={styles.datestamp}>
          {formatDatestamp(selectedConversation.createdAt)}
        </time>
      ) : (
        layout!.map(({ message, ...layout }) => (
          <Fragment key={message.id}>
            {layout.isDisplayDatestamp && (
              <time className={styles.datestamp}>
                {formatDatestamp(message.createdAt)}
              </time>
            )}
            <Message
              message={message}
              isCreatedByUser={layout.isCreatedByUser}
              isDisplayAuthor={layout.isDisplayAuthor}
              isDisplayTimestamp={layout.isDisplayTimestamp}
            />
          </Fragment>
        ))
      )}
      <div ref={ref} />
    </div>
  );
}
