import {TimeStamp} from "./time-stamp";

describe('TimeStamp Test', () => {
    test('toCurrentMonNine test', () => {
        const now = TimeStamp.now().toCurrentMonNine();
        expect(now.ms).toEqual(1667178000000);
    });

    test('distance test', () => {
        // 2022-01-01
        const start = TimeStamp.from(1640966400000);
        // 2022-01-16
        const end = TimeStamp.from(1642262400000);
        expect(start.distance(end).days()).toEqual(-15);
    });

    test('inWeekend test', () => {
        // 2021-12-31 Fri
        expect(TimeStamp.from(1640880000000).inWeekend()).toEqual(false);
        // 2022-01-01 Sat
        expect(TimeStamp.from(1640966400000).inWeekend()).toEqual(true);
        // 2022-01-02 Sun
        expect(TimeStamp.from(1641052800000).inWeekend()).toEqual(true);
        // 2022-01-03 Mon
        expect(TimeStamp.from(1641139200000).inWeekend()).toEqual(false);
    });
});