import { EnumCalendarDayItemPosition } from '@/logic/statics/calendar-day-item-position.enum';

interface CalendarEvent<T = undefined>  {
    id:string|number
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
    borderColor?:string
    isBordered?:boolean
    borderRadius?:string
    position:EnumCalendarDayItemPosition
    /**
     * Must be bigger then zero
     */
    zIndex:number
    /**
     * Data for customization
     */
    detail?:T
}

export type {CalendarEvent}