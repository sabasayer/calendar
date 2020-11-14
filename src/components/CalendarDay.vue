<template>
  <div class="calendar-day">
    <calendar-day-header />

    <div class="calendar-day__body">
      <calendar-day-hour-headers />
      <calendar-day-minute-headers />

      <calendar-day-hours-container />
    </div>

    <calendar-day-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CalendarDayHourHeadersComponent from "./body/CalendarDayHourHeaders.vue";
import CalendarDayHoursContainerComponent from "./body/CalendarDayHoursContainer.vue";
import CalendarDayMinuteHeadersComponent from "./body/CalendarDayMinuteHeaders.vue";
import CalendarDayFooterComponent from "./CalendarDayFooter.vue";
import CalendarDayHeaderComponent from "./CalendarDayHeader.vue";
import { CalendarDayItemOptions } from "../logic/types/calendar-day-item-options";

@Component({
  components: {
    "calendar-day-header": CalendarDayHeaderComponent,
    "calendar-day-hours-container": CalendarDayHoursContainerComponent,
    "calendar-day-footer": CalendarDayFooterComponent,
    "calendar-day-hour-headers": CalendarDayHourHeadersComponent,
    "calendar-day-minute-headers": CalendarDayMinuteHeadersComponent,
  },
})
export default class CalendarDayComponent extends Vue {
  @Prop({ type: Boolean, default: false }) readonly hasHeader!: boolean;
  @Prop({ type: String }) readonly startHour?: string;
  @Prop({ type: String }) readonly endHour?: string;
  @Prop({ type: Number }) readonly hourHeight?: number;
  @Prop({ type: Boolean, default: false }) readonly isHoursVisible!: boolean;
  @Prop({ type: Boolean, default: false }) readonly isMinutesVisible!: boolean;
  @Prop({ type: String }) readonly Header?: string;
  @Prop({ required: true, default: () => [] })
  readonly items!: CalendarDayItemOptions[];
  @Prop({ type: Number, default: 4 })
  readonly horizontalGapBetweenItems!: number;
}
</script>
