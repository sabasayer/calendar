import { EnumCalendarDayItemPosition } from "./statics/calendar-day-item-position.enum";
import { timeLogic } from "./time.logic";
import { CalendarDayItemPosition } from "./types/calendar-day-item";

class CalendarDayItemLogic {
  calculateHeightPerMinute(heightPerHour: number): number {
    return heightPerHour / 60;
  }

  calculateDistance(options: {
    from: string;
    to: string;
    hourHeight: number;
  }): number {
    const totalFromMinutes = timeLogic.totalMinutesInTimeSpan(options.from);
    const totalToMinutes = timeLogic.totalMinutesInTimeSpan(options.to);

    const difference = totalToMinutes - totalFromMinutes;
    if (difference < 0) throw "To must be later then from";

    const heightPerMinute = this.calculateHeightPerMinute(options.hourHeight);
    return heightPerMinute * difference;
  }

  calculateTopOffset(options: {
    from: string;
    hourHeight: number;
    startTime: string;
  }): number {
    return this.calculateDistance({
      from: options.startTime,
      to: options.from,
      hourHeight: options.hourHeight,
    });
  }

  calculateHeight(options: {
    from: string;
    to: string;
    hourHeight: number;
  }): number {
    return this.calculateDistance(options);
  }

  isCollidable(
    item1: EnumCalendarDayItemPosition,
    item2: EnumCalendarDayItemPosition
  ): boolean {
    return (
      item1 == EnumCalendarDayItemPosition.Relative &&
      item2 == EnumCalendarDayItemPosition.Relative
    );
  }

  detectCollision(
    item1: CalendarDayItemPosition,
    item2: CalendarDayItemPosition
  ): boolean {
    const item1Bottom = item1.topOffset + item1.height;
    const item2Bottom = item2.topOffset + item2.height;

    return item1Bottom > item2.topOffset && item1.topOffset < item2Bottom;
  }

  calculateWidth(options: {
    item: CalendarDayItemPosition;
    marginBetweenItems: number;
    containerWidth: number;
    collidedItemCount: number;
  }): number {
    const totalItemCount = options.collidedItemCount + 1;
    const totalMargin = options.collidedItemCount * options.marginBetweenItems;
    const remainingWidth = options.containerWidth - totalMargin;

    const widthPerItem = remainingWidth / totalItemCount;
    return widthPerItem;
  }

  calculateLeft(options: {
    item: CalendarDayItemPosition;
    collidedItems: CalendarDayItemPosition[];
    containerWidth: number;
    marginBetweenItems: number;
  }): number {
    const widthPerItem = this.calculateWidth({
      collidedItemCount: options.collidedItems.length,
      ...options,
    });

    const sortedItems = [...options.collidedItems, options.item].sort(
      (a, b) => a.order - b.order
    );
    const itemIndex = sortedItems.indexOf(options.item);

    const leftOffset = (widthPerItem + options.marginBetweenItems) * itemIndex;
    return leftOffset;
  }
}

export const calendarDayItemLogic = new CalendarDayItemLogic();
