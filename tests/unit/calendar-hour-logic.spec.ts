import { calendarHourLogic } from "@/logic/calendar-hour.logic";
import { MinuteInterval } from "types/logic/minute-interval";

describe("Calendar Hour Logic", () => {
  it("should create hours array between two timeSpan", () => {
    const start = "07:00";
    const end = "14:00";

    const hours = calendarHourLogic.createHoursArray(start, end);

    expect(hours).toEqual([
      { value: 7, text: "07" },
      { value: 8, text: "08" },
      { value: 9, text: "09" },
      { value: 10, text: "10" },
      { value: 11, text: "11" },
      { value: 12, text: "12" },
      { value: 13, text: "13" },
      { value: 14, text: "14" },
    ]);
  });

  it("should create minutes array with minuteInterval", () => {
    const minuteInterval = 15;
    const hour = 9;
    const minutes = calendarHourLogic.createMinutes(hour, minuteInterval);

    const expected: MinuteInterval[] = [
      { from: "09:00", to: "09:15", text: "00" },
      { from: "09:15", to: "09:30", text: "15" },
      { from: "09:30", to: "09:45", text: "30" },
      { from: "09:45", to: "10:00", text: "45" },
    ];

    expect(minutes).toEqual(expected);
  });
});
