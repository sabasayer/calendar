import { calendarDayItemLogic } from "./calendar-day-item.logic";
import { draggableItemLogic } from "./draggable-item.logic";
import {
  CalendarDayItem,
  CalendarDayItemPosition,
} from "./types/calendar-day-item";

class AreaSelectLogic {
  calculatePositions(
    start: number,
    end: number
  ): Pick<CalendarDayItemPosition, "topOffset" | "height"> {
    const topOffset = Math.min(start, end);
    const height = Math.abs(start - end);

    return {
      topOffset,
      height,
    };
  }

  findLimits(options: {
    currentPosition: number;
    items: Pick<CalendarDayItem, "topOffset" | "height">[];
  }): { top: number; bottom: number } {
    const { currentPosition, items } = options;

    let top = 0;
    let bottom = 0;

    items.forEach((item) => {
      const itemBottom = draggableItemLogic.calculateBottom(
        item.topOffset,
        item.height
      );
      if (itemBottom <= currentPosition) top = Math.max(itemBottom, top);
      if (item.topOffset >= currentPosition)
        bottom = Math.min(item.topOffset, bottom || item.topOffset);
    });

    return { top, bottom };
  }
}

export const areaSelectLogic = new AreaSelectLogic();
