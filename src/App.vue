<template>
  <div id="app">
    <calendar-day
      @item-click="itemClicked"
      @item-drop="itemDrop"
      @item-resize="itemResize"
      @area-select="areaSelect"
      :start-time="startTime"
      :end-time="endTime"
      :events="events"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      :hour-padding-right="20"
      :is-area-selectable="true"
      :is-minutes-visible="false"
      has-header
      header="First Day"
    >
    </calendar-day>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarDayComponent from "./components/CalendarDay.vue";
import { EnumCalendarDayItemPosition } from "../types/statics/calendar-day-item-position.enum";
import { CalendarDayItem } from "../types/logic/calendar-day-item";
import { CalendarEvent } from "../types/logic/calendar-event";
import { CalendarDayEventOptions } from '../types/components/calendar-day-event-options';

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
      zIndex: 5,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 121,
      from: "09:00",
      to: "10:20",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Randevu",
      color: "teal",
      zIndex: 5,
      isResizable: true,
      isDraggable: true,
    },
    {
      id: 120,
      from: "10:00",
      to: "11:40",
      position: EnumCalendarDayItemPosition.Relative,
      title: "Randevu",
      color: "pink",
      zIndex: 5,
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

  areaSelect(options: CalendarDayEventOptions) {
    options.item.id = Math.random();
    this.createEvent(options);
  }

  createEvent(options: CalendarDayEventOptions) {
    if (options.blockingCollidedItems?.length) return;

    let event = options.item;
    event.isDraggable = true;
    event.isResizable = true;
    event.color = "orange";
    event.id = Math.random();
    this.events.push(event);
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
