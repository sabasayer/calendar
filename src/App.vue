<template>
  <div id="app">
    <calendar-day
      @item-click="itemClicked"
      @item-drop="itemDrop"
      @item-resize="itemResize"
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
import { CalendarDayEventOptions } from "./components/types/calendar-day-event-options";

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
      to: "08:42",
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
      textColor: "white",
    },
  ];

  itemClicked(options: CalendarDayEventOptions) {
    console.info("item clicked", options.item);
  }

  itemDrop(options: CalendarDayEventOptions) {
    this.updateEvent(options);
  }

  itemResize(options: CalendarDayEventOptions) {
    this.updateEvent(options);
  }

  updateEvent(options: CalendarDayEventOptions) {
    if (options.blockingCollidedItems?.length) return;

    let event = this.events.find((e) => e.id === options.item.id);

    if (!event) return;

    event.to = options.item.to;
    event.from = options.item.from;
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
