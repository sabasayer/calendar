import _Vue from "vue";
import CalendarDay from "./CalendarDay.vue";
import CalendarHoursContainer from "./body/CalendarHoursContainer.vue";
import type { CalendarDayEventOptions } from "../../types/components/calendar-day-event-options";
import type { EnumCalendarDayItemPosition } from "../../types/statics/calendar-day-item-position.enum";

declare global {
  interface Window {
    Vue: typeof _Vue;
  }
}

const install = (Vue: typeof _Vue): void => {
  Vue.component("CalendarDay", CalendarDay);
  Vue.component("CalendarHoursContainer", CalendarHoursContainer);
};

export default install;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}

export {
  CalendarDay,
  CalendarHoursContainer,
  CalendarDayEventOptions,
  EnumCalendarDayItemPosition,
};
