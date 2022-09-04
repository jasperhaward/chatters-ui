import { Message } from "@types";

export interface TimestampProps {
    className?: string;
    message: Message;
}

export function Timestamp({ className, message }: TimestampProps) {
    const createdAt = new Date(message.createdAt);

    let timestamp: string;

    if (createdAt.isToday()) {
        timestamp = formatCreatedAt({
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    } else if (createdAt.isYesterday()) {
        timestamp = "Yesterday";
    } else if (createdAt.isThisWeek()) {
        timestamp = formatCreatedAt({
            weekday: "long",
        });
    } else {
        timestamp = formatCreatedAt({
            day: "numeric",
            month: "short",
        });
    }

    function formatCreatedAt(options: Intl.DateTimeFormatOptions) {
        return createdAt.toLocaleString("en-GB", options);
    }

    return <time className={className}>{timestamp}</time>;
}
