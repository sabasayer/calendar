<template>
  <div id="app">
    <calendar-day
      @item-click="itemClicked"
      @item-drop="itemDrop"
      @item-resize="itemResize"
      @area-select="areaSelect"
      @minute-click="minuteClick"
      @mouse-over="mouseOver"
      @mouse-leave="mouseLeave"
      :start-time="startTime"
      :end-time="endTime"
      :events="events"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      :hour-padding-right="20"
      :is-area-selectable="true"
      :is-minutes-visible="true"
      :isMinutesClickable="true"
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
import { CalendarDayEventOptions } from "../types/components/calendar-day-event-options";
import { MinuteInterval } from "types/logic";

@Component({
  components: {
    "calendar-day": CalendarDayComponent,
  },
})
export default class App extends Vue {
  startTime = "08:00";
  endTime = "21:59";
  hourHeight = 100;
  minuteInterval = 25;

  events: CalendarEvent[] = [
    {
      id: 1,
      from: "16:30",
      to: "16:40",
      title: "Test açıklama vs",
      color: "pink",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
      isDraggable: true,
      isResizable: true,
    },
    {
      id: 2,
      from: "16:50",
      to: "18:00",
      title: "Test açıklama vs",
      color: "pink",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
      isDraggable: true,
      isResizable: true,
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

  minuteClick(minute: MinuteInterval) {
    let event: CalendarEvent = {
      to: minute.to,
      from: minute.from,
      color: "pink",
      id: Math.random(),
      title: "test",
      position: EnumCalendarDayItemPosition.Absolute,
      zIndex: 1,
      isDraggable: true,
      isResizable: true,
    };

    this.events.push(event);
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

  mouseOver(item: CalendarDayItem, el: HTMLElement) {}

  mouseLeave(item: CalendarDayItem, el: HTMLElement) {}
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
