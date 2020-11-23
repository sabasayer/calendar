<template>
  <div class="calendar-hours">
    <div
      v-for="hour in hours"
      :key="`hour_${hour.value}`"
      class="calendar-hour"
      :style="computedStyle"
    >
      <calendar-minute
        v-for="minute in minutes(hour.value)"
        @select-area="selectArea"
        @select-area-finish="selectAreaFinished"
        :key="`${hour.value}_${minute.text}`"
        :minute="minute"
        :is-clickable="isMinutesClickable"
        :is-area-selectable="isAreaSelectable"
        :start-time="startTime"
        :end-time="endTime"
        :hour-height="hourHeight"
        :minute-interval="minuteInterval"
        :disabled="isActionsDisabled"
        :new-item-position="newItemPosition"
        :items="items"
        class="calendar-hour__minute"
      >
        <slot name="minute" :minute="minute" :hour="hour"></slot>
      </calendar-minute>
    </div>

    <calendar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :hour-height="hourHeight"
      :minute-interval="minuteInterval"
      :is-clone-visible.sync="isCloneVisible"
      :clone-item.sync="cloneItem"
      :start-time="startTime"
      :end-time="endTime"
      @move="itemMove"
      @click="itemClick"
      @drop="itemDrop"
      @resize="resize"
    >
      <template>
        <slot name="item" :item="item"></slot>
      </template>
    </calendar-item>

    <calendar-item
      v-if="isCloneVisible"
      is-ghost
      key="ghost"
      :item="cloneItem"
    />
  </div>
</template>
<script lang="ts">
import { calendarDayLogic } from "@/logic/calendar-day.logic";
import { CalendarDayItem } from "types/logic/calendar-day-item";
import { CalendarEvent } from "types/logic/calendar-event";
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
import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";
import { CalendarDayEventOptions } from "../../../types/components/calendar-day-event-options";
import CalendarMinuteComponent from "./CalendarMinute.vue";
import { EnumCalendarDayItemPosition } from "../../../types/statics/calendar-day-item-position.enum";

@Component({
  components: {
    "calendar-item": CalendarItemComponent,
    "calendar-minute": CalendarMinuteComponent,
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
  @Prop({ type: Boolean, default: false }) readonly isActionsDisabled: boolean;
  @Prop({ type: Boolean, default: false }) readonly isMinutesClickable: boolean;
  @Prop({ type: Boolean, default: false }) readonly isAreaSelectable: boolean;
  @Prop({ default: EnumCalendarDayItemPosition.Relative })
  readonly newItemPosition: EnumCalendarDayItemPosition;

  items: CalendarDayItem[] = [];

  isCloneVisible: boolean = false;
  cloneItem: CalendarDayItem = calendarDayItemLogic.createDefaultModel();

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

  calculateAvailableWidth(): number {
    const containerWidth = this.getContainerWidth();

    if (!containerWidth) return 0;

    return containerWidth - this.hourPaddingRight;
  }

  createItems() {
    const availableWidth = this.calculateAvailableWidth();

    this.items = calendarDayLogic.createItems({
      events: this.events,
      startTime: this.startTime,
      hourHeight: this.hourHeight,
      containerWidth: availableWidth,
      marginBetweenItems: this.horizontalMarginBetweenItems,
    });
  }

  clearClone() {
    this.cloneItem = calendarDayItemLogic.createDefaultModel();
  }

  hideClone() {
    this.isCloneVisible = false;
  }

  getContainerWidth() {
    return this.$el?.clientWidth ?? 0;
  }

  filterCollidedItems(item: CalendarDayItem) {
    return calendarDayLogic.filterCollidedItems(item, this.items);
  }

  filterBlockingCollidedItems(item: CalendarDayItem) {
    return calendarDayLogic.filterBLockingCollidedItems(item, this.items);
  }

  itemMove(item: CalendarDayItem, el: HTMLElement) {
    const blockingCollidedItems = this.filterBlockingCollidedItems(
      this.cloneItem
    );

    this.cloneItem.cannotDrop = !!blockingCollidedItems.length;
  }

  itemClick(item: CalendarDayItem, el: HTMLElement) {
    const collidedItems = this.filterCollidedItems(item);

    const options: CalendarDayEventOptions = {
      item,
      collidedItems,
      el,
    };
    this.$emit("item-click", options);
    this.clearClone();
  }

  itemDrop(item: CalendarDayItem, el: HTMLElement) {
    const collidedItems = this.filterCollidedItems(item);
    const blockingCollidedItems = this.filterBlockingCollidedItems(item);

    const options: CalendarDayEventOptions = {
      item,
      collidedItems,
      blockingCollidedItems,
      el,
    };
    this.$emit("item-drop", options);
    this.clearClone();
  }

  resize(item: CalendarDayItem, el: HTMLElement) {
    const collidedItems = this.filterCollidedItems(item);

    const options: CalendarDayEventOptions = {
      item,
      collidedItems,
      el,
    };
    this.$emit("item-resize", options);
    this.clearClone();
  }

  selectArea(item: CalendarDayItem) {
    const availableWidth = this.calculateAvailableWidth();

    item.width = availableWidth;

    this.cloneItem = item;
    this.isCloneVisible = true;
    console.log("area selected", item);
  }

  selectAreaFinished(item: CalendarDayItem) {
    const collidedItems = this.filterCollidedItems(item);

    const options: CalendarDayEventOptions = {
      item,
      collidedItems,
    };
    this.$emit("area-select", options);
    this.clearClone();
    this.hideClone();
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
  }
}
</style>
