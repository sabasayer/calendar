import _Vue from "vue";
import CalendarDay from "./CalendarDay.vue";
import { CalendarDayEventOptions } from "./calendar-day-event-options";

declare global {
  interface Window {
    Vue: typeof _Vue;
  }
}

declare const install: (Vue: typeof _Vue) => void;
export default install;
export { CalendarDay, CalendarDayEventOptions };
export * from "../logic";
