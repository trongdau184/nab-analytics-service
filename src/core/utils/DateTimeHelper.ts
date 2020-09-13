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
}