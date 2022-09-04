const DAY = 24 * 60 * 60 * 1000;
const WEEK = DAY * 7;
const YEAR = DAY * 365;

declare global {
    interface Date {
        isToday(): boolean;
        isYesterday(): boolean;
        isThisWeek(): boolean;
        isThisYear(): boolean;
    }
}

Date.prototype.isToday = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0);
};

Date.prototype.isYesterday = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0) - DAY;
};

Date.prototype.isThisWeek = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0) - WEEK;
};

Date.prototype.isThisYear = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0) - YEAR;
};

export {};
