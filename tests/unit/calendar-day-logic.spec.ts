import { calendarDayLogic } from "@/logic/calendar-day.logic";
import { EnumCalendarDayItemPosition } from "@/logic/statics/calendar-day-item-position.enum";
import {
  CalendarDayItem,
  CalendarDayItemPosition,
} from "@/logic/types/calendar-day-item";
import { CalendarEvent } from "@/logic/types/calendar-event";

describe("Calendar Day Logic", () => {
  it("should create item from options with vertical positions", () => {
    const options: CalendarEvent = {
      id: 1,
      color: "pink",
      from: "12:30",
      to: "13:30",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Test",
      zIndex: 1,
    };

    const hourHeight = 100;

    const item = calendarDayLogic.createItemWithVerticalPositions({
      event: options,
      hourHeight,
      startTime: "08:00",
    });

    const expected: CalendarDayItem = {
      ...options,
      topOffset: 450,
      leftOffset: 0,
      height: 100,
      width: 0,
      order: 0,
    };

    expect(item).toEqual(expected);
  });

  it("should set horizontal values for item", () => {
    let item: CalendarDayItem = {
      id: 1,
      color: "red",
      from: "14:00",
      to: "14:30",
      height: 50,
      topOffset: 50,
      order: 1,
      position: EnumCalendarDayItemPosition.Relative,
      title: "Test",
      width: 0,
      leftOffset: 0,
      zIndex: 1,
    };

    item = calendarDayLogic.updateHorizontalPositions({
      item,
      allItems: [item],
      containerWidth: 100,
      marginBetweenItems: 10,
    });

    expect(item.width).toBe(100);
    expect(item.leftOffset).toBe(0);
  });

  it("should set horizontal values for item with colliision", () => {
    let item: CalendarDayItem = {
      id: 1,
      color: "blue",
      from: "15:00",
      to: "16:00",
      height: 50,
      topOffset: 100,
      order: 2,
      position: EnumCalendarDayItemPosition.Relative,
      title: "Test",
      leftOffset: 0,
      width: 0,
      zIndex: 1,
    };

    const allItems: CalendarDayItem[] = [
      {
        id: 2,
        topOffset: 70,
        height: 200,
        order: 1,
        leftOffset: 0,
        width: 0,
        color: "",
        from: "",
        to: "",
        title: "",
        position: EnumCalendarDayItemPosition.Relative,
        zIndex: 1,
      },
      {
        id: 2,
        topOffset: 90,
        height: 120,
        order: 3,
        leftOffset: 0,
        width: 0,
        color: "",
        from: "",
        to: "",
        title: "",
        position: EnumCalendarDayItemPosition.Relative,
        zIndex: 1,
      },
      item,
    ];

    item = calendarDayLogic.updateHorizontalPositions({
      item,
      allItems,
      containerWidth: 100,
      marginBetweenItems: 5,
    });

    expect(item.width).toBe(30);
    expect(item.leftOffset).toBe(35);
  });

  it("should order items by topOffset", () => {
    let items: CalendarDayItemPosition[] = [
      {
        topOffset: 150,
        height: 10,
        leftOffset: 0,
        order: 0,
        width: 0,
        zIndex:1,
      },
      {
        topOffset: 130,
        height: 20,
        leftOffset: 0,
        order: 0,
        width: 0,
        zIndex:1,
      },
      {
        topOffset: 20,
        height: 120,
        leftOffset: 14,
        order: 0,
        width: 0,
        zIndex:1,
      },
    ];

    calendarDayLogic.orderItems(items);

    expect(items[0]).toEqual({
      topOffset: 20,
      height: 120,
      leftOffset: 14,
      order: 0,
      width: 0,
      zIndex:1,
    });

    expect(items[1]).toEqual({
      topOffset: 130,
      height: 20,
      leftOffset: 0,
      order: 1,
      width: 0,
      zIndex:1,
    });

    expect(items[2]).toEqual({
      topOffset: 150,
      height: 10,
      leftOffset: 0,
      order: 2,
      width: 0,
      zIndex:1,
    });
  });

  it("should create Items", () => {
    const startTime = "08:00";
    const hourHeight = 100;
    const containerWidth = 200;
    const marginBetweenItems = 10;

    let options: CalendarEvent[] = [
      {
        id: 1,
        color: "black",
        from: "08:00",
        to: "09:00",
        position: EnumCalendarDayItemPosition.Static,
        title: "Kapalı",
        zIndex:1
      },
      {
        id: 2,
        color: "red",
        from: "09:30",
        to: "10:30",
        position: EnumCalendarDayItemPosition.Relative,
        title: "Randevu 2",
        zIndex:2,
      },
      {
        id: 3,
        color: "red",
        from: "09:15",
        to: "10:00",
        position: EnumCalendarDayItemPosition.Relative,
        title: "Randevu",
        zIndex:2
      },
      {
        id: 4,
        color: "blue",
        from: "11:30",
        to: "12:30",
        position: EnumCalendarDayItemPosition.Absolute,
        title: "Randevu 3",
        zIndex:3,
      },
      {
        id: 5,
        color: "blue",
        from: "12:00",
        to: "13:00",
        position: EnumCalendarDayItemPosition.Relative,
        title: "Randevu 3",
        zIndex:2
      },
    ];

    const items = calendarDayLogic.createItems({
      events: options,
      startTime,
      hourHeight,
      containerWidth,
      marginBetweenItems,
    });

    const expectedItems: CalendarDayItem[] = [
      {
        ...options[0],
        order: 0,
        height: 100,
        topOffset: 0,
        leftOffset: 0,
        width: containerWidth,
      },
      {
        ...options[2],
        order: 1,
        height: 75,
        topOffset: 125,
        leftOffset: 0,
        width: 95,
      },
      {
        ...options[1],
        order: 2,
        height: 100,
        topOffset: 150,
        leftOffset: 105,
        width: 95,
      },
      {
        ...options[3],
        order: 3,
        height: 100,
        topOffset: 350,
        leftOffset: 0,
        width: containerWidth,
      },
      {
        ...options[4],
        order: 4,
        height: 100,
        topOffset: 400,
        leftOffset: 0,
        width: containerWidth,
      },
    ];

    expect(items).toEqual(expectedItems);
  });
});
