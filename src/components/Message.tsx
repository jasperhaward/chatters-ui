import styles from "./Message.module.scss";

import colours from "@styling/_colours.module.scss";
import { Message as IMessage, UserWithMeta } from "@types";
import { rgb, contrast } from "@utils/colours";
import { Icon } from ".";

export interface MessageProps {
    message: IMessage;
    author: UserWithMeta;
    meta: MessageMeta;
}

export interface MessageMeta {
    alignRight: boolean;
    showAuthor: boolean;
    showTimestamp: boolean;
    pointedTop: boolean;
    pointedBottom: boolean;
}

export function Message({ message, author, meta }: MessageProps) {
    let className = styles.message;

    if (meta.alignRight) className += ` ${styles.alignRight}`;
    if (meta.pointedTop) className += ` ${styles.pointedTop}`;
    if (meta.pointedBottom) className += ` ${styles.pointedBottom}`;

    const color =
        contrast(author.backgroundColor, colours.white) >
        contrast(author.backgroundColor, colours.black)
            ? colours.white
            : colours.black;

    return (
        <div className={className}>
            {meta.showAuthor && (
                <div className={styles.author}>{author.username}</div>
            )}
            <article>
                <div className={styles.avatar}>
                    {meta.showAuthor && <Icon icon={["fas", "user"]} />}
                </div>
                <div
                    className={styles.content}
                    style={{ color, backgroundColor: author.backgroundColor }}
                >
                    {message.content}
                </div>
            </article>
            {meta.showTimestamp && (
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
