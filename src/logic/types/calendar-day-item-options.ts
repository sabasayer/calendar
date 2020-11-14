import { EnumCalendarDayItemPosition } from '@/logic/statics/calendar-day-item-position.enum';

interface CalendarDayItemOptions<T = undefined>  {
    /**
     * timeSpan
     */
    from:string
    /**
     * timeSpan
     */
    to:string
    title:string
    /**
     * valid css color
     */
    color:string
    position:EnumCalendarDayItemPosition
    /**
     * Data for customization
     */
    detail?:T
}

export type {CalendarDayItemOptions}