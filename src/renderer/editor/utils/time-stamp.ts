import moment from "moment";

export class TimeStamp {
    static WEEK_DURING = 604800000;
    static WORKDAY_DURING = 432000000;
    static DAY_DURING = 86400000;
    static HOUR_DURING = 3600000;

    constructor(private milliseconds: number) {
    }

    get ms(): number {
        return this.milliseconds
    }

    static from(milliseconds: number): TimeStamp {
        return new TimeStamp(milliseconds)
    }

    static now(): TimeStamp {
        return new TimeStamp(Date.now())
    }

    toCurrentMonNine(): TimeStamp {
        const now = moment(this.milliseconds);
        now.weekday(1);
        now.hours(9);
        now.minutes(0);
        now.seconds(0);
        now.milliseconds(0);
        return new TimeStamp(now.valueOf())
    }

    subtract(milliseconds: number): TimeStamp {
        this.milliseconds = this.milliseconds - milliseconds;
        return this
    }

    format(): string {
        return moment(this.milliseconds).format()
    }

    /**
     * self和other相差的毫秒数
     * 2022-01-01和2022-01-16相差15天 -15
     * @param other
     */
    distance(other: TimeStamp): TimeStamp {
        return TimeStamp.from(this.milliseconds - other.milliseconds)
    }

    days(): number {
        return this.milliseconds / 1000 / 60 / 60 / 24
    }

    debugWeekday(): string {
        return moment(this.milliseconds).format("ddd")
    }

    inWeekend(): boolean {
        const weekday = moment(this.milliseconds).weekday()
        return weekday == 6 || weekday == 0
    }

    plusDay(): this {
        this.milliseconds += TimeStamp.DAY_DURING;
        return this
    }

    minusDay(): this {
        this.milliseconds -= TimeStamp.DAY_DURING;
        return this
    }

    plusHour(): this {
        this.milliseconds += TimeStamp.HOUR_DURING;
        return this
    }

    minusHour(): this {
        this.milliseconds += TimeStamp.HOUR_DURING;
        return this
    }
}
