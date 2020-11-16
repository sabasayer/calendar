import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";
import { EnumCalendarDayItemPosition } from "@/logic/statics/calendar-day-item-position.enum";
import { CalendarDayItemPosition } from "@/logic/types/calendar-day-item";

describe("Calendar Day Item Logic", () => {
  it("should calculate height per minute", () => {
    const hourHeight = 120;
    const heightPerMinute = calendarDayItemLogic.calculateHeightPerMinute(
      hourHeight
    );

    expect(heightPerMinute).toBe(2);
  });

  it("should calculate distance between two timeSpan text", () => {
    const from = "12:00";
    const to = "16:30";
    const hourHeight = 100;

    const distance = calendarDayItemLogic.calculateDistance({
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
      calendarDayItemLogic.calculateDistance({
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

    const topOffset = calendarDayItemLogic.calculateTopOffset({
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

    const height = calendarDayItemLogic.calculateHeight({
      from,
      to,
      hourHeight,
    });

    expect(height).toBe(250);
  });

  it("should return true for isCollidable when both position relative", () => {
    const isCollidable = calendarDayItemLogic.isCollidable(
      EnumCalendarDayItemPosition.Relative,
      EnumCalendarDayItemPosition.Relative
    );

    expect(isCollidable).toBe(true);
  });

  it("should detect collision for two item", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 100,
      height: 50,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };
    const item2: CalendarDayItemPosition = {
      order: 2,
      topOffset: 70,
      height: 80,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };

    const isCollides = calendarDayItemLogic.detectCollision(item1, item2);

    expect(isCollides).toBe(true);
  });

  it("should return false for edge collision", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      height: 20,
      topOffset: 20,
      leftOffset: 0,
      width: 0,
      zIndex: 1,
    };

    const item2: CalendarDayItemPosition = {
      order: 1,
      height: 30,
      topOffset: 40,
      leftOffset: 0,
      width: 0,
      zIndex: 1,
    };

    const isCollides = calendarDayItemLogic.detectCollision(item1, item2);

    expect(isCollides).toBe(false);
  });

  it("should not detect collision for two not colliding item", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 20,
      height: 50,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };
    const item2: CalendarDayItemPosition = {
      order: 2,
      topOffset: 80,
      height: 80,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };

    const isCollides = calendarDayItemLogic.detectCollision(item1, item2);

    expect(isCollides).toBe(false);
  });

  it("should detect collision on same items", () => {
    const item1: CalendarDayItemPosition = {
      order: 1,
      topOffset: 10,
      height: 12,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };

    const isCollides = calendarDayItemLogic.detectCollision(item1, item1);

    expect(isCollides).toBe(true);
  });

  it("should calculate width of item", () => {
    let item: CalendarDayItemPosition = {
      order: 1,
      topOffset: 10,
      height: 20,
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };

    const marginBetweenItems = 5;
    const containerWidth = 100;
    const collidedItemCount = 1;

    const width = calendarDayItemLogic.calculateWidth({
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
      zIndex:1
    };

    let collidedItems: CalendarDayItemPosition[] = [
      {
        order: 1,
        topOffset: 5,
        height: 15,
        width: 0,
        leftOffset: 0,
        zIndex: 1,
      },
      {
        order: 2,
        topOffset: 5,
        height: 15,
        width: 0,
        leftOffset: 0,
        zIndex: 1,
      },
    ];

    const marginBetweenItems = 5;
    const containerWidth = 100;

    let leftOffset = calendarDayItemLogic.calculateLeft({
      item,
      collidedItems,
      marginBetweenItems,
      containerWidth,
    });

    expect(leftOffset).toBe(70);
  });
});
