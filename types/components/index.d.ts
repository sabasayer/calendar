import _Vue from "vue";
import CalendarDay from "./CalendarDay.vue";
import CalendarHoursContainer from "./CalendarHoursContainer.vue";
import { CalendarDayEventOptions } from "./calendar-day-event-options";
import { EnumCalendarDayItemPosition } from "../statics/calendar-day-item-position.enum";

declare global {
  interface Window {
    Vue: typeof _Vue;
  }
}

declare const install: (Vue: typeof _Vue) => void;
export default install;
export {
  CalendarDay,
  CalendarDayEventOptions,
  CalendarHoursContainer,
  EnumCalendarDayItemPosition,
};
export * from "../logic";
