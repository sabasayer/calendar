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
      position: EnumCalendarDayItemPosition.Static,
      title: "",
      color: "#666",
      zIndex: 1,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 120,
      from: "12:00",
      to: "12:20",
      position: EnumCalendarDayItemPosition.Static,
      title: "",
      color: "#666",
      zIndex: 1,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 75,
      from: "14:00",
      to: "16:00",
      position: EnumCalendarDayItemPosition.Static,
      title: "",
      color: "pink",
      zIndex: 1,
    },
  ];

  itemClicked(
    item: CalendarDayItem,
    collidedItems: CalendarDayItem[],
    element: HTMLElement
  ) {
    console.info("item clicked", element);
  }

  itemDrop(
    item: CalendarDayItem,
    collidedItems: CalendarDayItem[],
    element: HTMLElement
  ) {
    console.log("item dropped", element);

    const event = this.events.find((e) => e.id == item.id);
    if (!event) return;
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
