import { CalendarDayItem } from '@/logic/types/calendar-day-item';

export type CalendarDayEventOptions = {
    item:CalendarDayItem,
    el?:HTMLElement,
    collidedItems:CalendarDayItem[],
    blockingCollidedItems?:CalendarDayItem[]
}
