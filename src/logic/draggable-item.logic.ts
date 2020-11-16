import { calendarDayItemLogic } from "./calendar-day-item.logic";
import { CalendarDayItem } from "./types/calendar-day-item";
import { MinuteInterval } from "./types/minute-interval";

import cloneDeep from "lodash/cloneDeep";

class DraggableItemLogic {
  snapToMinute(options: {
    topOffset: number;
    minuteInterval: number;
    hourHeight: number;
  }): number {
    const heightPerMinute = calendarDayItemLogic.calculateHeightPerMinute(
      options.hourHeight
    );
    const minuteHeight = heightPerMinute * options.minuteInterval;

    const remaining = options.topOffset % minuteHeight;

    if (remaining < minuteHeight / 2) return options.topOffset - remaining;
    else return minuteHeight - remaining + options.topOffset;
  }

  calculateRelativeTop(pageY: number, topOffset: number): number {
    return topOffset - pageY;
  }

  calculateNewTop(pageY: number, firstTopOffset: number): number {
    return pageY + firstTopOffset;
  }

  createClone(item: CalendarDayItem): CalendarDayItem {
    let clone = cloneDeep(item);
    clone.isDraggable = false;
    clone.isResizable = false;
    clone.isClickable = false;
    return clone;
  }
}

export const draggableItemLogic = new DraggableItemLogic();
