export class TimeStamp {
    static WEEK_DURING = 604800000;
    static WORKDAY_DURING = 432000000;
    static DAY_DURING = 86400000;
    static HOUR_DURING = 3600000;

    constructor(public milliseconds: number) {
    }

    static from(milliseconds: number): TimeStamp {
        return new TimeStamp(milliseconds)
    }

    loop(step: number, end: TimeStamp, op: (time: TimeStamp) => void) {
        let start = this.milliseconds;
        while (start < end.milliseconds) {
            op(TimeStamp.from(start));
            start += step;
        }
    }
}

enum ViewType {
    Day,
    Week,
    Month
}

const CELL_WIDTH = 18;

export class TimeStampConverter {
    constructor(
        private base: number = Date.now(),
        private viewType: ViewType = ViewType.Day
    ) {
    }
}
