import styles from "./Message.module.scss";

import colours from "@styling/_colours.module.scss";
import { Message as IMessage } from "@types";
import { contrast } from "@utils";
import { Icon } from ".";

export interface MessageProps {
    message: IMessage;
    meta: MessageMeta;
}

export interface MessageMeta {
    alignRight: boolean;
    backgroundColor: string;
    showAuthor: boolean;
    showTimestamp: boolean;
    pointedTop: boolean;
    pointedBottom: boolean;
}

export function Message({
    message,
    meta: {
        alignRight,
        backgroundColor,
        showTimestamp,
        showAuthor,
        pointedTop,
        pointedBottom,
    },
}: MessageProps) {
    let className = styles.message;

    if (alignRight) className += ` ${styles.alignRight}`;
    if (pointedTop) className += ` ${styles.pointedTop}`;
    if (pointedBottom) className += ` ${styles.pointedBottom}`;

    function color() {
        return contrast(backgroundColor, colours.white) >
            contrast(backgroundColor, colours.black)
            ? colours.white
            : colours.black;
    }

    return (
        <div className={className}>
            {showAuthor && (
                <div className={styles.author}>
                    {message.createdBy.username}
                </div>
            )}
            <article>
                <div className={styles.avatar}>
                    {showAuthor && <Icon icon={["fas", "user"]} />}
                </div>
                <div
                    className={styles.content}
                    style={{ color: color(), backgroundColor }}
                >
                    {message.content}
                </div>
            </article>
            {showTimestamp && (
                <time>
                    {new Date(message.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </time>
            )}
        </div>
    );
}
