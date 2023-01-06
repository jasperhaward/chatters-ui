declare global {
    interface Date {
        isSameDate(date: Date): boolean;
        isToday(): boolean;
        isYesterday(): boolean;
        isThisWeek(): boolean;
        isThisYear(): boolean;
    }
}

export {};
