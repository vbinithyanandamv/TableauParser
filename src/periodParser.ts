import dayjs from 'dayjs';
import { IPeriodInfo } from './dataParser';


enum PeriodTypes {
    NUMBER = 1,
    COLON_SEPARATED_INDEX = 2,
    INDEX_AT_END = 3,
    MONTH_STRING_SH = 4,
    MONTH_STRING_LG = 5,
    WEEK_STRING_SH  = 6,
    WEEK_STRING_LG  = 7,
    ISO_8601_DATE   = 8,
    TEXT = 9
}

export class PeriodParser {
    
    constructor(){

    }

    private static monthWeekFormats = {
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

    private static indexAtEndRegex = /\d+$/;

    private static checkMonthWeekFormat(str: string) {
        if(typeof str !== "string") return;

        const mwFormats = PeriodParser.monthWeekFormats;
        const formatTypes = Object.keys(mwFormats);
        let periodFormat: string;
        let matchFound: boolean = false;
        str = str.toLowerCase();

        for (let i = 0; i < formatTypes.length; i++) {
            matchFound = mwFormats[formatTypes[i]].some((item: string) => {
                return item === str;
            });

            if (matchFound) {
                periodFormat = formatTypes[i];
                break;
            }
        }
        return periodFormat;
    }

     private static getOrderbyStartPeriod(src: any, periods: any, start: any): number[] {
        let sortOrder: number[] = [];
        const len = src.length;
        const pLen = periods.length - 1;
        const maxItr: number = len * 2;
        let itr: number = 1;
        let i: number = 0;
        let k: number = 0;
        let count: number = -1;
        let cPeriod: any;

        start = start == null ? src[0] : start;
        while (count < pLen && itr <= maxItr) {
            cPeriod = src[i];
            if (count >= 0 || cPeriod === start) {
                for (k = 0; k <= pLen; k++) {
                    if (cPeriod === periods[k] && typeof sortOrder[k] === 'undefined') {
                        sortOrder[k] = ++count;
                        break;
                    }
                }

                // start exists in src but not in periods
                if (count < 0 && itr < len) {
                    start = src[itr];
                }
            }

            // start does not exist in both "periods" and "src"
            if (count < 0 && itr >= len) {
                start = src[0];
            }

            i = ++i >= len ? 0 : i;
            itr++;
        }

        // just a precaution if in any case we are not able to create desired sortOrder
        if(sortOrder.length !== periods.length) {
            sortOrder = periods.map((period: any, index: number) => index);
        }
        return sortOrder;
    }

    private static processFallback(periods: any, startPeriod: any, periodInfo: IPeriodInfo) {
            if(!(periodInfo.possibleTypes = periodInfo.possibleTypes || []).includes(periodInfo.type)) {
                periodInfo.possibleTypes.push(periodInfo.type);
            }
            periodInfo.type = PeriodTypes[PeriodTypes.TEXT];
            return PeriodParser.processTextPeriod(periods, startPeriod);
    }

    private static getPeriodType(period: string | number) {
        if (typeof period === "number") {
            return PeriodTypes.NUMBER;
        }

        let periodType = PeriodParser.checkMonthWeekFormat(period);
        if (periodType) {
            return PeriodTypes[periodType];
        }

        if (dayjs(period).isValid()) {
            return PeriodTypes.ISO_8601_DATE;
        }

        if (!isNaN(parseInt(period))) {
            return PeriodTypes.COLON_SEPARATED_INDEX;
        }

        if (period.match(PeriodParser.indexAtEndRegex)) {
            return PeriodTypes.INDEX_AT_END;
        }

        return PeriodTypes.TEXT;
    }

        private static processNumber(periods: number[], startPeriod: number): number[] {
        const sortedPeriod = periods.slice().sort((a, b) => a - b);
        return PeriodParser.getOrderbyStartPeriod(sortedPeriod, periods, startPeriod);
    }
    

    private static processColonSeparatedIndex(
        periods: string[],
        startPeriod: string,
        periodInfo: IPeriodInfo
    ): number[] {
        let hasTypeDiff: boolean = false;
        const pNums: number[] = [];
        const pLen = periods.length;
        let num: number;
        for (let i = 0; i < pLen; i++) {
            num = parseInt(periods[i]);
            if (isNaN(num)) {
                hasTypeDiff = true;
                break;
            }
            pNums.push(num);
        }

        // if type difference is detected then fallback
        if (hasTypeDiff) return PeriodParser.processFallback(periods, startPeriod, periodInfo);

        let start = parseInt(startPeriod);
        start = isNaN(start) ? null : start;
        return PeriodParser.processNumber(pNums, start);
    }

    private static processIndexAtEnd(
        periods: string[],
        startPeriod: string,
        periodInfo: IPeriodInfo
    ): number[] {
        let matches: any;
        let hasTypeDiff: boolean = false;
        const pNums: number[] = [];
        const pLen = periods.length;
        let num: number;
        for (let i = 0; i < pLen; i++) {
            if (typeof periods[i] === "string") {
                matches = periods[i].match(PeriodParser.indexAtEndRegex);
                num = parseInt(matches[0]);
                if (isNaN(num)) {
                    hasTypeDiff = true;
                    break;
                }
                pNums.push(num);
            } else {
                hasTypeDiff = true;
                break;
            }    
        }

        // if type difference is detected then fallback
        if (hasTypeDiff) return PeriodParser.processFallback(periods, startPeriod, periodInfo);

        matches = startPeriod && startPeriod.match(PeriodParser.indexAtEndRegex);
        let start = matches ? parseInt(matches[0]) : null;
        return PeriodParser.processNumber(pNums, start);
    }

    private static processMonthWeek(
        periods: string[],
        periodType: number,
        startPeriod: string,
        periodInfo: IPeriodInfo
    ): number[] {
        const formatList: string[] = PeriodParser.monthWeekFormats[PeriodTypes[periodType]].slice();
        const periodSet: Set<string> = new Set(formatList);
        const formattedPeriods: string[] = [];
        const pLen: number = periods.length;
        let period: string;
        let hasTypeDiff: boolean = false;
        let isNotString: boolean = false;
        // convert all the periods to lowercase as per our stored formattings
        for (let i = 0; i < pLen; i++) {
            period = periods[i];
            isNotString = typeof period !== "string";
            period = isNotString ? null : period.toLowerCase();
            if (!period || !periodSet.has(period)) {
                hasTypeDiff = true;
                break;
            }
            formattedPeriods.push(period);
        }

        // if type difference is detected then fallback
        if (hasTypeDiff) return PeriodParser.processFallback(periods, startPeriod, periodInfo);

        startPeriod = startPeriod ? startPeriod.toString().toLowerCase() : formatList[0];
        return PeriodParser.getOrderbyStartPeriod(formatList, formattedPeriods, startPeriod);
    }

    private static processISODate(
        periods: string[],
        startPeriod: string,
        periodInfo: IPeriodInfo
    ): number[] {
        const pLen = periods.length;
        const parsedPeriods: Date[] = [];
        const strDateMap = {};
            let datePeriod: any;
        let hasTypeDiff: boolean = false;

        // convert string to Date and cache the Date and string mapping
        for (let i = 0; i < pLen; i++) {
            datePeriod = dayjs(periods[i]);
            if (!(<any>datePeriod).isValid()) {
                hasTypeDiff = true;
                break;
            }
            strDateMap[(<any>datePeriod).format()] = periods[i];
            parsedPeriods.push(datePeriod);
        }

        // if type difference is detected then fallback
        if (hasTypeDiff) return PeriodParser.processFallback(periods, startPeriod, periodInfo);

        const sortedDates = parsedPeriods.sort((d1: Date, d2: Date) => {
            return (<any>d1).isSame(d2) ? 0 : (<any>d1).isBefore(d2) ? -1 : 1;
        });

        // get the orginal string back from the sorted Date
        const src = sortedDates.map((period: any) => {
            return strDateMap[(<any>period).format()];
        });

        return PeriodParser.getOrderbyStartPeriod(src, periods, startPeriod);
    }

    private static processTextPeriod(periods: string[], startPeriod: string) {
        const src = periods.slice().sort();
        return PeriodParser.getOrderbyStartPeriod(src, periods, startPeriod);
    }

     private static getSortedIndexes(
        periods: string[] | number[],
        periodType: number,
        startPeriod: string | number,
        periodInfo: any
    ): number[] {
        switch (periodType) {
            case PeriodTypes.NUMBER:
                return PeriodParser.processNumber(periods as number[], startPeriod as number);

            case PeriodTypes.COLON_SEPARATED_INDEX:
                return PeriodParser.processColonSeparatedIndex(periods as string[], startPeriod as string, periodInfo);

            case PeriodTypes.INDEX_AT_END:
                return PeriodParser.processIndexAtEnd(periods as string[], startPeriod as string, periodInfo);

            case PeriodTypes.MONTH_STRING_LG:
            case PeriodTypes.MONTH_STRING_SH:
            case PeriodTypes.WEEK_STRING_LG:
            case PeriodTypes.WEEK_STRING_SH:
                return PeriodParser.processMonthWeek(periods as string[], periodType, startPeriod as string, periodInfo);

            case PeriodTypes.ISO_8601_DATE:
                return PeriodParser.processISODate(periods as string[], startPeriod as string, periodInfo);

            case PeriodTypes.TEXT:
                return PeriodParser.processTextPeriod(periods as string[], startPeriod as string);

        }
    }

    public getSortedOrder(periods: string[] | number[]) {
        const period = periods[0][3]._value;
        let periodType = PeriodParser.getPeriodType(period);  
        return PeriodParser.monthWeekFormats[PeriodTypes[periodType]];
    }

}

