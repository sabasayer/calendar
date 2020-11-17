import { draggableItemLogic } from "@/logic/draggable-item.logic";
import { EnumCalendarDayItemPosition } from "@/logic/statics/calendar-day-item-position.enum";
import { CalendarDayItem } from "@/logic/types/calendar-day-item";

describe("Draggable Item Logic", () => {
  it("should snap position to prev minuteInterval", () => {
    let topOffset = 10;
    const minuteInterval = 15;
    const hourHeight = 100;

    topOffset = draggableItemLogic.snapToMinute({
      topOffset,
      minuteInterval,
      hourHeight,
    });
    expect(topOffset).toBe(0);
  });

  it("should snap position to next minuteInterval", () => {
    let topOffset = 48;
    const minuteInterval = 15;
    const hourHeight = 100;

    topOffset = draggableItemLogic.snapToMinute({
      topOffset,
      minuteInterval,
      hourHeight,
    });

    expect(topOffset).toBe(50);
  });

  it("should calculate first relativeTop position to mouse", () => {
    const pageY = 10;
    const topOffset = 0;

    const relativeTop = draggableItemLogic.calculateRelativeTop(
      pageY,
      topOffset
    );

    expect(relativeTop).toBe(-10);
  });

  it("should calculate newTop position", () => {
    const pageY = 89;
    const firstTopOffset = -25;

    const topOffset = draggableItemLogic.calculateNewTop(pageY, firstTopOffset);

    expect(topOffset).toBe(64);
  });

  it("should create clone for draggable ghost", () => {
    const item: CalendarDayItem = {
      id: 1,
      color: "pink",
      from: "08:10",
      to: "10:20",
      height: 50,
      leftOffset: 100,
      order: 1,
      position: EnumCalendarDayItemPosition.Absolute,
      title: "Test",
      topOffset: 120,
      width: 100,
      zIndex: 1,
      isBordered:true
    };

    const clone = draggableItemLogic.createClone(item);

    expect(clone.isClickable).toBe(false);
    expect(clone.isDraggable).toBe(false);
    expect(clone.isResizable).toBe(false);
    expect(clone.zIndex).toBe(20);
  });


  it("should detect collision for new position",() => {

  })
});
