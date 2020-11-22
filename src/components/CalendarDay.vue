<template>
  <div class="calendar-day">
    <calendar-day-header />

    <div class="calendar-day__body">
      <calendar-hour-headers
        :start-time="startTime"
        :end-time="endTime"
        :hour-height="hourHeight"
        :minute-interval="minuteInterval"
      />

      <calendar-hours-container
        @item-click="itemClick"
        @item-drop="itemDrop"
        @item-resize="itemResize"
        @area-select="areaSelect"
        :start-time="startTime"
        :end-time="endTime"
        :hour-height="hourHeight"
        :events="events"
        :horizontal-margin-between-items="horizontalMarginBetweenItems"
        :minute-interval="minuteInterval"
        :hour-padding-right="hourPaddingRight"
        :is-minutes-clickable="isMinutesClickable"
        :is-area-selectable="isAreaSelectable"
        :is-actions-disabled="isActionsDisabled"
        :new-item-position="newItemPosition"
      >
        <template #minute="{ minute, hour }">
          <slot name="minute" :minute="minute" :hour="hour"></slot>
        </template>
        <template #item="{ item }">
          <slot name="item" :item="item"></slot>
        </template>
      </calendar-hours-container>
    </div>

    <calendar-day-footer />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import CalendarHourHeadersComponent from "./body/CalendarHourHeaders.vue";
import CalendarHoursContainerComponent from "./body/CalendarHoursContainer.vue";
import CalendarDayFooterComponent from "./CalendarDayFooter.vue";
import CalendarDayHeaderComponent from "./CalendarDayHeader.vue";
import { CalendarDayItem } from "../../types/logic/calendar-day-item";
import { CalendarEvent } from "../../types/logic/calendar-event";
import { EnumCalendarDayItemPosition } from "../../types/statics/calendar-day-item-position.enum";

@Component({
  components: {
    "calendar-day-header": CalendarDayHeaderComponent,
    "calendar-hours-container": CalendarHoursContainerComponent,
    "calendar-day-footer": CalendarDayFooterComponent,
    "calendar-hour-headers": CalendarHourHeadersComponent,
  },
})
export default class CalendarDayComponent extends Vue {
  @Prop({ type: Boolean, default: false }) readonly hasHeader: boolean;
  @Prop({ type: String, default: "00:00" }) readonly startTime?: string;
  @Prop({ type: String, default: "23:00" }) readonly endTime?: string;
  @Prop({ type: Number, default: 100 }) readonly hourHeight: number;
  @Prop({ type: Boolean, default: false }) readonly isHoursVisible: boolean;
  @Prop({ type: Boolean, default: false }) readonly isMinutesVisible: boolean;
  @Prop({ type: String }) readonly Header?: string;
  @Prop({ required: true, default: () => [] })
  readonly events: CalendarEvent[];
  @Prop({ type: Number, default: 4 })
  readonly horizontalMarginBetweenItems: number;
  @Prop({ type: Number, default: 30 }) readonly minuteInterval: number;
  @Prop({ type: Number, default: 20 })
  readonly hourPaddingRight: number;
  @Prop({ type: Boolean, default: false }) readonly isActionsDisabled: boolean;
  @Prop({ type: Boolean, default: false }) readonly isMinutesClickable: boolean;
  @Prop({ type: Boolean, default: false }) readonly isAreaSelectable: boolean;
  @Prop({ default: EnumCalendarDayItemPosition.Relative })
  readonly newItemPosition: EnumCalendarDayItemPosition;

  @Emit()
  itemClick() {}

  @Emit()
  itemDrop() {}

  @Emit()
  itemResize() {}

  @Emit()
  areaSelect() {}
}
</script>
<style scoped>
.calendar-day__body {
  display: flex;
}
</style>
