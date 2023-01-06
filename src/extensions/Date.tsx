import { INTERVAL } from "@constants";

Date.prototype.isSameDate = function (date) {
    return (
        this.getUTCFullYear() === date.getUTCFullYear() &&
        this.getUTCMonth() === date.getUTCMonth() &&
        this.getUTCDate() === date.getUTCDate()
    );
};

Date.prototype.isToday = function () {
    const today = new Date();

    return this.isSameDate(today);
};

Date.prototype.isYesterday = function () {
    return (
        this.getTime() > new Date().setHours(0, 0, 0, 0) - INTERVAL.DAY &&
        !this.isToday()
    );
};

Date.prototype.isThisWeek = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0) - INTERVAL.WEEK;
};

Date.prototype.isThisYear = function () {
    return this.getTime() > new Date().setHours(0, 0, 0, 0) - INTERVAL.YEAR;
};
