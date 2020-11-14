import { calendarDayLogic } from "@/logic/calendar-day.logic";
import {
  CalendarDayItem,
  CalendarDayItemPosition,
} from "@/logic/types/calendar-day-item";

describe("Calendar Day Logic", () => {
  
  it("should calculate height per minute", () => {
    const hourHeight = 120;
    const heightPerMinute = calendarDayLogic.calculateHeightPerMinute(120);

    expect(heightPerMinute).toBe(2);
  });

  it("should calculate distance between two timeSpan text", () => {
    const from = "12:00";
    const to = "16:30";
    const hourHeight = 100;

    const distance = calendarDayLogic.calculateDistance({
      from,
      to,
      hourHeight,
    });

    expect(distance).toBe(450);
  });

  it("should throw error if from is after then to", () => {
    const from = "13:23";
    const to = "13:12";
    const hourHeight = 12;

    expect(() =>
      calendarDayLogic.calculateDistance({
        from,
        to,
        hourHeight,
      })
    ).toThrow("To must be later then from");
  });

  it("should calculate vertical position for item", () => {
    const from = "12:00";
    const hourHeight = 100;
    const startTime = "08:00";

    const topOffset = calendarDayLogic.calculateTopOffset({
      from,
      hourHeight,
      startTime,
    });

    expect(topOffset).toBe(400);
  });

  it("should calculate height", () => {
    const from = "11:00";
    const to = "13:30";
    const hourHeight = 100;

    const height = calendarDayLogic.calculateHeight({
      from,
      to,
      hourHeight,
    });

    expect(height).toBe(250);
  });

  it("should detect collision for two item", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 100,
      height: 50,
      width: 0,
      leftOffset: 0,
    };
    const item2: CalendarDayItemPosition = {
      order: 2,
      topOffset: 70,
      height: 80,
      width: 0,
      leftOffset: 0,
    };

    const isCollides = calendarDayLogic.detectCollision(item1, item2);

    expect(isCollides).toBe(true);
  });

  it("should not detect collision for two not colliding item", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 20,
      height: 50,
      width: 0,
      leftOffset: 0,
    };
    const item2: CalendarDayItemPosition = {
      order: 2,
      topOffset: 80,
      height: 80,
      width: 0,
      leftOffset: 0,
    };

    const isCollides = calendarDayLogic.detectCollision(item1, item2);

    expect(isCollides).toBe(false);
  });

  it("should detect collision on same items", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 10,
      height: 12,
      width: 0,
      leftOffset: 0,
    };

    const isCollides = calendarDayLogic.detectCollision(item1, item1);

    expect(isCollides).toBe(true);
  });

  it("should calculate width of item", () => {
    let item: CalendarDayItemPosition = {
      order: 1,
      topOffset: 10,
      height: 20,
      width: 0,
      leftOffset: 0,
    };

    const marginBetweenItems = 5;
    const containerWidth = 100;
    const collidedItemCount = 1;

    const width = calendarDayLogic.calculateWidth({
      item,
      marginBetweenItems,
      containerWidth,
      collidedItemCount,
    });

    expect(width).toBe(47.5);
  });

  it("should calculate left of item", () => {
    let item: CalendarDayItemPosition = {
      order: 3,
      topOffset: 10,
      height: 20,
      width: 0,
      leftOffset: 0,
    };

    let collidedItems: CalendarDayItemPosition[] = [
      {
        order: 1,
        topOffset: 5,
        height: 15,
        width: 0,
        leftOffset: 0,
      },
      {
        order: 2,
        topOffset: 5,
        height: 15,
        width: 0,
        leftOffset: 0,
      },
    ];

    const marginBetweenItems = 5;
    const containerWidth = 100;

    let leftOffset = calendarDayLogic.calculateLeft({
      item,
      collidedItems,
      marginBetweenItems,
      containerWidth,
    });

    expect(leftOffset).toBe(70);
  });
});
