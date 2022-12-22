import { useMemo } from "preact/hooks";

export interface MessagesPaneDatestampProps {
    className?: string;
    timestamp: string;
}

export function Datestamp({
    className,
    timestamp,
}: MessagesPaneDatestampProps) {
    const datestamp = useMemo(() => {
        const date = new Date(timestamp);

        if (date.isToday()) {
            return "Today";
        } else if (date.isYesterday()) {
            return "Yesterday";
        } else if (date.isThisWeek()) {
            return date.toLocaleString("en-GB", {
                weekday: "long",
            });
        } else if (date.isThisYear()) {
            return date.toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
            });
        } else {
            return date.toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }
    }, [timestamp]);

    return <time className={className}>{datestamp}</time>;
}
