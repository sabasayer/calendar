import _Vue from "vue";
import CalendarDay from "./CalendarDay.vue";
import CalendarDayHeader from "./CalendarDayHeader.vue";
import CalendarDayFooter from "./CalendarDay.vue";

declare global {
  interface Window {
    Vue: typeof _Vue;
  }
}

const install = (Vue: typeof _Vue): void => {
  Vue.component("CalendarDay", CalendarDay);
  Vue.component("CalendarDayHeader", CalendarDayHeader);
  Vue.component("CalendarDayFooter", CalendarDayFooter);
};

export default install;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}

export { CalendarDay, CalendarDayHeader, CalendarDayFooter };
