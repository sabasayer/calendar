import { CalendarDayItem } from '../logic/calendar-day-item';

export type CalendarDayEventOptions = {
    item:CalendarDayItem,
    el?:HTMLElement,
    collidedItems:CalendarDayItem[],
    blockingCollidedItems?:CalendarDayItem[]
}
