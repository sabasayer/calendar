<template>
  <div id="app">
    <calendar-day
      @item-click="itemClicked"
      @item-drop="itemDrop"
      :start-time="startTime"
      :end-time="endTime"
      :events="events"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      :hour-padding-right="20"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarDayComponent from "./components/CalendarDay.vue";
import { EnumCalendarDayItemPosition } from "./logic/statics/calendar-day-item-position.enum";
import { CalendarDayItem } from "./logic/types/calendar-day-item";
import { CalendarEvent } from "./logic/types/calendar-event";

@Component({
  components: {
    "calendar-day": CalendarDayComponent,
  },
})
export default class App extends Vue {
  startTime = "08:00";
  endTime = "23:59";
  hourHeight = 80;
  minuteInterval = 20;

  events: CalendarEvent[] = [
    {
      id: 1,
      from: "08:00",
      to: "08:12",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Randevu",
      color: "orange",
      zIndex: 1,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 121,
      from: "12:00",
      to: "12:20",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Randevu",
      color: "teal",
      zIndex: 1,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 120,
      from: "12:00",
      to: "12:40",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Randevu",
      color: "pink",
      zIndex: 1,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 75,
      from: "14:00",
      to: "16:00",
      position: EnumCalendarDayItemPosition.Static,
      title: "Kapalı",
      color: "#555",
      zIndex: 1,
      isResizable: true,
    },
  ];

  itemClicked(options: {
    item: CalendarDayItem;
    collidedItems: CalendarDayItem[];
    element: HTMLElement;
  }) {
    console.info("item clicked", options.item);
  }

  itemDrop(options: {
    item: CalendarDayItem;
    collidedItems: CalendarDayItem[];
    collidedBlockingItems: CalendarDayItem[];
    element: HTMLElement;
  }) {}
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
