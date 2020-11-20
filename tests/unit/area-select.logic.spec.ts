import { areaSelectLogic } from "@/logic/area-select.logic";
import { CalendarDayItem } from "@/logic/types/calendar-day-item";

describe("Area Select Logic", () => {
  it("should calculate topOffset and height from start-end positions", () => {
    const start = 320;
    const end = 210;

    const positions = areaSelectLogic.calculatePositions(start, end);

    expect(positions).toEqual({
      topOffset: 210,
      height: 110,
    });
  });

  it("should find top-bottom limits from positions", () => {
    const currentPosition = 120;

    const positions: Pick<CalendarDayItem, "topOffset" | "height">[] = [
      { topOffset: 20, height: 20 },
      { topOffset: 30, height: 20 },
      { topOffset: 140, height: 20 },
    ];

    const limits = areaSelectLogic.findLimits({
      currentPosition,
      items: positions,
    });

    expect(limits).toEqual({
      top: 50,
      bottom: 140,
    });

    it("should fix end position if not in limits", () => {
      const start = 80;
      const end = 190;
      const startTime = "08:00";
      const endTime = "09:10";

      const positions: Pick<CalendarDayItem, "topOffset" | "height">[] = [
        { topOffset: 220, height: 20 },
      ];
    });
  });
});
