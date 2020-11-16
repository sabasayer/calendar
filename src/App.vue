<template>
  <div id="app">
    <calendar-day
      :start-time="startTime"
      :end-time="endTime"
      :events="events"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      :hour-padding-right="40"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarDayComponent from "./components/CalendarDay.vue";
import { EnumCalendarDayItemPosition } from "./logic/statics/calendar-day-item-position.enum";
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
      to: "08:25",
      title: "Test",
      color: "rgba(51,102,204,0.8)",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
    },
    {
      id: 2,
      from: "08:16",
      to: "08:42",
      title: "Test",
      color: "rgba(51,102,104,0.8)",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
    },
    {
      id: 3,
      from: "12:00",
      to: "12:43",
      title: "Test 2",
      color: "rgba(51,102,104,0.8)",
      position: EnumCalendarDayItemPosition.Absolute,
      zIndex: 1,
    },
    {
      id: 4,
      from: "11:40",
      to: "12:13",
      title: "Test 2",
      color: "rgba(203,2,4,0.8)",
      position: EnumCalendarDayItemPosition.Absolute,
      zIndex: 1,
    },
    {
      id: 5,
      from: "13:00",
      to: "13:15",
      title: "Test",
      color: "rgba(204,202,4,0.8)",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
    },
    {
      id: 6,
      from: "13:10",
      to: "14:00",
      title: "Test",
      color: "rgba(200,102,4,0.8)",
      position: EnumCalendarDayItemPosition.Relative,
      zIndex: 1,
    },
  ];
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
