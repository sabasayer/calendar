<template>
  <div class="calendar-hours">
    <div
      v-for="hour in hours"
      :key="hour.value"
      class="calendar-hour"
      :style="computedStyle"
    >
      <div
        v-for="minute in minutes(hour.value)"
        :key="`${hour.value}_${minute.text}`"
        class="calendar-hour__minute"
      >
        <slot name="minute" :minute="minute" :hour="hour"></slot>
      </div>
    </div>

    <calendar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      @click="itemClick"
    >
      <template>
        <slot name="item" :item="item"></slot>
      </template>
    </calendar-item>

    
  </div>
</template>
<script lang="ts">
import { calendarDayLogic } from "@/logic/calendar-day.logic";
import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { CalendarEvent } from "@/logic/types/calendar-event";
import { calendarHourLogic } from "@/logic/calendar-hour.logic";
import {
  Component,
  Emit,
  Mixins,
  Prop,
  Vue,
  Watch,
} from "vue-property-decorator";
import CalendarHourMixin from "./CalendarHourMixin";
import CalendarItemComponent from "@/components/item/CalendarItem.vue";

@Component({
  components: {
    "calendar-item": CalendarItemComponent,
  },
})
export default class CalendarHoursContainerComponent extends Mixins(
  CalendarHourMixin
) {
  @Prop({ required: true, default: () => [] }) readonly events: CalendarEvent[];
  @Prop({ type: Number, default: 4 })
  readonly horizontalMarginBetweenItems!: number;
  @Prop({ type: Number, default: 20 })
  readonly hourPaddingRight: number;

  items: CalendarDayItem[] = [];

  get minutes() {
    return (hour: number) =>
      calendarHourLogic.createMinutes(hour, this.minuteInterval);
  }

  mounted() {
    this.createItems();
  }

  @Watch("events", { deep: true })
  onEventsChanged() {
    this.createItems();
  }

  getContainerWidth() {
    return this.$el?.clientWidth ?? 0;
  }

  createItems() {
    const containerWidth = this.getContainerWidth();

    if (!containerWidth) return;

    const availableWidth = containerWidth - this.hourPaddingRight;

    this.items = calendarDayLogic.createItems({
      events: this.events,
      startTime: this.startTime,
      hourHeight: this.hourHeight,
      containerWidth: availableWidth,
      marginBetweenItems: this.horizontalMarginBetweenItems,
    });
  }

  itemClick(item: CalendarDayItem, el: HTMLElement) {
    const collidedItems = calendarDayLogic.filterCollidedItems(
      item,
      this.items
    );

    this.$emit("item-click", item, collidedItems, el);
  }
}
</script>
<style scoped lang="scss">
@import "@/style/definitions.scss";

.calendar-hours {
  flex: 1;
  position: relative;
  .calendar-hour {
    box-sizing: border-box;
    border-bottom: 1px solid $border-color;
    display: flex;
    flex-direction: column;

    .calendar-hour__minute {
      flex: 1;
      box-sizing: border-box;
      &:not(:last-child) {
        border-bottom: 1px dashed $border-color-soft;
      }
    }
  }
}
</style>
