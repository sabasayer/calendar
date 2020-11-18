import { calendarDayItemLogic } from "./calendar-day-item.logic";
import { draggableItemLogic } from "./draggable-item.logic";
import { CalendarDayItem } from "./types/calendar-day-item";

class ResizeLogic {
  calculateBottomLimit(
    containerHeight: number,
    closestBlockingPosition?: number
  ): number {
    return closestBlockingPosition
      ? Math.min(containerHeight, closestBlockingPosition)
      : containerHeight;
  }

  fixHeight(options: {
    topOffset: number;
    height: number;
    bottomLimit: number;
  }): number {
    const bottom = draggableItemLogic.calculateBottom(
      options.topOffset,
      options.height
    );

    const isInside = bottom <= options.bottomLimit;
    if (isInside) return options.height;

    return options.bottomLimit - options.topOffset;
  }

  fixHeightByClosestBlockingPosition(options: {
    topOffset: number;
    height: number;
    closestBlockingPosition?: number;
    startTime: string;
    endTime: string;
    hourHeight: number;
  }): number {
    const containerHeight = calendarDayItemLogic.calculateDistance({
      from: options.startTime,
      to: options.endTime,
      hourHeight: options.hourHeight,
    });

    const bottomLimit = this.calculateBottomLimit(
      containerHeight,
      options.closestBlockingPosition
    );

    return this.fixHeight({
      topOffset: options.topOffset,
      height: options.height,
      bottomLimit,
    });
  }

  findClosestTopPositionBelow(
    item: Pick<CalendarDayItem, "id" | "topOffset" | "height">,
    positions: Pick<CalendarDayItem, "id" | "topOffset">[]
  ): number {
    const bottom = draggableItemLogic.calculateBottom(
      item.topOffset,
      item.height
    );

    const blockingPositionsBelow = positions
      .filter((e) => e.id != item.id && e.topOffset > bottom)
      .map((e) => e.topOffset);

    return blockingPositionsBelow.length
      ? Math.min(...blockingPositionsBelow)
      : 0;
  }
}

export const resizeLogic = new ResizeLogic();
