import * as moment from "moment";

export default class DateTimeHelper {
    public static getStartOfDay(d: Date) {
        let momentDate = moment(d);
        momentDate = momentDate.startOf("day");
        return momentDate.toDate();
    }

    public static getEndOfDay(d: Date) {
        let momentDate = moment(d);
        momentDate = momentDate.endOf("day");
        return momentDate.toDate();
    }

    public static getDaysDiff(from: Date, to: Date) {
        let f = DateTimeHelper.setBeginDay(from);
        let t = DateTimeHelper.setBeginDay(to);
        return moment(t).diff(moment(f), 'days');
    }

    public static setBeginDay(date: Date) {
        return new Date(date.setHours(0, 0, 0, 0));
    }

    public static setEndDay(date: Date) {
        return new Date(date.setHours(23, 59, 59, 999));
    }
}