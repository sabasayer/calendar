import { timeLogic } from "@/logic/time.logic";

describe("TimeLogic", () => {
  it("should create two digit text", () => {
    const result = timeLogic.createTwoDigitText(9);

    expect(result).toBe("09");
  });

  it("should get hour and minute from timeSpan text", () => {
    const timeSpanText = "12:23";

    const timeSpan = timeLogic.getTimeSpan(timeSpanText);

    expect(timeSpan).toEqual({ hour: 12, minute: 23 });
  });

  it("should throw error if is not a valid timespan text", () => {
    const timeSpanText = "12334";

    expect(() => timeLogic.getTimeSpan(timeSpanText)).toThrow(
      `${timeSpanText} is not a valid timespan`
    );
  });

  it("should calculate total minutes in timespan", () => {
    const timeSpanText = "13:24";

    const totalMinutes = timeLogic.totalMinutesInTimeSpan(timeSpanText);
    expect(totalMinutes).toBe(804);
  });
});
