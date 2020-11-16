import { calendarDayItemLogic } from "./calendar-day-item.logic";
import {
  CalendarDayItem,
  CalendarDayItemPosition,
} from "./types/calendar-day-item";
import { CalendarEvent } from "./types/calendar-event";

class CalendarDayLogic {
  createItemWithVerticalPositions(options: {
    event: CalendarEvent;
    hourHeight: number;
    startTime: string;
  }): CalendarDayItem {
    const { event: itemOptions } = options;

    const height = calendarDayItemLogic.calculateHeight({
      from: itemOptions.from,
      to: itemOptions.to,
      hourHeight: options.hourHeight,
    });

    const topOffset = calendarDayItemLogic.calculateTopOffset({
      from: itemOptions.from,
      hourHeight: options.hourHeight,
      startTime: options.startTime,
    });

    return {
      ...options.event,
      topOffset,
      height,
      leftOffset: 0,
      width: 0,
      order: 0,
    };
  }

  updateHorizontalPositions(options: {
    item: CalendarDayItem;
    allItems: CalendarDayItem[];
    containerWidth: number;
    marginBetweenItems: number;
  }): CalendarDayItem {
    let { item, containerWidth, marginBetweenItems } = options;

    const collidedItems = options.allItems.filter(
      (e) =>
        e.id != item.id &&
        calendarDayItemLogic.isCollidable(e.position, item.position) &&
        calendarDayItemLogic.detectCollision(e, item)
    );

    item.leftOffset = calendarDayItemLogic.calculateLeft({
      item,
      collidedItems,
      containerWidth,
      marginBetweenItems,
    });

    item.width = calendarDayItemLogic.calculateWidth({
      item: item,
      collidedItemCount: collidedItems.length,
      containerWidth,
      marginBetweenItems,
    });

    return item;
  }

  orderItems<T extends CalendarDayItemPosition>(items: T[]): T[] {
    items.sort((a, b) => a.topOffset - b.topOffset);
    items.forEach((item, i) => (item.order = i));

    return items;
  }

  createItems(options: {
    events: CalendarEvent[];
    startTime: string;
    hourHeight: number;
    containerWidth: number;
    marginBetweenItems: number;
  }): CalendarDayItem[] {
    let items = options.events.map((event) =>
      this.createItemWithVerticalPositions({
        event,
        hourHeight: options.hourHeight,
        startTime: options.startTime,
      })
    );

    items = this.orderItems(items);

    items = items.map((item) =>
      this.updateHorizontalPositions({
        item,
        containerWidth: options.containerWidth,
        marginBetweenItems: options.marginBetweenItems,
        allItems: items,
      })
    );

    return items;
  }

  filterCollidedItems(
    item: CalendarDayItem,
    items: CalendarDayItem[]
  ): CalendarDayItem[] {
    return items.filter(
      (e) =>
        e.id !== item.id &&
        calendarDayItemLogic.detectCollision<CalendarDayItem>(e, item)
    );
  }
}

export const calendarDayLogic = new CalendarDayLogic();
