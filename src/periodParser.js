import dayjs from 'dayjs';
export class PeriodParser {
    constructor(){
        this.PeriodTypes =  {
            "NUMBER":1,
            "COLON_SEPARATED_INDEX":2,
            "INDEX_AT_END":3,
            "MONTH_STRING_SH":4,
            "MONTH_STRING_LG":5,
            "WEEK_STRING_SH":6,
            "WEEK_STRING_LG":7,
            "ISO_8601_DATE":8,
            "TEXT":9
        }

        //unwanted can be removed if we use enum

        this.PeriodKeyTypes =  {
            1:"NUMBER",
            2:"COLON_SEPARATED_INDEX",
            3:"INDEX_AT_END",
            4:"MONTH_STRING_SH",
            5:"MONTH_STRING_LG",
            6:"WEEK_STRING_SH",
            7:"WEEK_STRING_LG",
            8:"ISO_8601_DATE",
            9:"TEXT"
        }

        this.monthWeekFormats = {
                "MONTH_STRING_SH": [
                    "jan",
                    "feb",
                    "mar",
                    "apr",
                    "may",
                    "jun",
                    "jul",
                    "aug",
                    "sep",
                    "oct",
                    "nov",
                    "dec"
                ],
                "MONTH_STRING_LG": [
                    "january",
                    "february",
                    "march",
                    "april",
                    "may",
                    "june",
                    "july",
                    "august",
                    "september",
                    "october",
                    "november",
                    "december"
                ],
                "WEEK_STRING_SH": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                "WEEK_STRING_LG": [
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday"
                ]
            };

            this.indexAtEndRegex = /\d+$/;
    }

    checkMonthWeekFormat = (str) => {
        if(typeof str !== "string") return;

        const mwFormats = this.monthWeekFormats;
        const formatTypes = Object.keys(mwFormats);
        let periodFormat;
        let matchFound = false;
        str = str.toLowerCase();

        for (let i = 0; i < formatTypes.length; i++) {
            matchFound = mwFormats[formatTypes[i]].some((item) => {
                return item === str;
            });

            if (matchFound) {
                periodFormat = formatTypes[i];
                break;
            }
        }
        return periodFormat;
    }

    getPeriodType = (period) => {
        if (typeof period === "number") {
            return this.PeriodTypes.NUMBER;
        }

        let periodType = this.checkMonthWeekFormat(period);
        if (periodType) {
            return this.PeriodTypes[periodType];
        }

        if (dayjs(period).isValid()) {
            return this.PeriodTypes.ISO_8601_DATE;
        }

        if (!isNaN(parseInt(period))) {
            return this.PeriodTypes.COLON_SEPARATED_INDEX;
        }

        if (period.match(this.indexAtEndRegex)) {
            return this.PeriodTypes.INDEX_AT_END;
        }

        return this.PeriodTypes.TEXT;
    }

}