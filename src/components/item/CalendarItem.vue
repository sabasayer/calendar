<template>
  <div class="calendar-item" :style="computedStyle">
    <slot>
      <span>{{ item.title }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CalendarItemComponent extends Vue {
  @Prop({ required: true }) readonly item: CalendarDayItem;

  get computedStyle() {
    return {
      backgroundColor: this.item.color,
      zIndex: this.item.zIndex,
      height: `${this.item.height}px`,
      top: `${this.item.topOffset}px`,
      left: `${this.item.leftOffset}px`,
      width: `${this.item.width}px`,
      borderRadius: this.item.borderRadius,
    };
  }
}
</script>
<style scoped lang="scss">
.calendar-item {
  position: absolute;
}
</style>
