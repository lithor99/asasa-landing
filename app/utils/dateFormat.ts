import moment from "moment";
export const SetDateFormat = (date: string, format?: string) => {
    if (!date || date === "undefined" || date === "null") {
        return moment(new Date()).format(format || "DD-MM-YYYY hh:mm:ss");
    }
    return moment(date).format(format || "DD-MM-YYYY hh:mm:ss");
    // return date;
};
