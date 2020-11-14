import { CalendarDayItemOptions } from "./calendar-day-item-options";

interface CalendarDayItemPosition {
    order:number;
    topOffset:number;
    height:number;
    leftOffset:number;
    width:number;
}

interface CalendarDayItem<T = undefined> extends CalendarDayItemOptions<T>,CalendarDayItemPosition{
  
}

export type {CalendarDayItem,CalendarDayItemPosition}