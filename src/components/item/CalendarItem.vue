<template>
  <div
    @click="click"
    @mousedown="mouseDown"
    class="calendar-item"
    :style="computedStyle"
    :class="computedClass"
  >
    <div class="calendar-item__content">
      <slot>
        <span>{{ item.title }}</span>
      </slot>

      <vertical-resize-handler
        v-if="item.isResizable"
        @resize="onResized"
        @resize-end="onResizeEnd"
        :hour-height="hourHeight"
        :minute-interval="minuteInterval"
        :top-offset="topOffset"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop, Emit, Mixins } from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import DraggableItemMixin from "./DraggableItemMixin";
import VerticalResizeHandlerComponent from "../VerticalResizeHandler.vue";
import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";

@Component({
  components: {
    "vertical-resize-handler": VerticalResizeHandlerComponent,
  },
})
export default class CalendarItemComponent extends Mixins(DraggableItemMixin) {
  get topOffset() {
    return this._isCloneVisible
      ? this._cloneItem.topOffset + this._cloneItem.height
      : this.item.topOffset + this.item.height;
  }

  get computedStyle() {
    return {
      backgroundColor: this.item.color,
      zIndex: this.item.zIndex,
      height: `${this.item.height}px`,
      top: `${this.item.topOffset}px`,
      left: `${this.item.leftOffset}px`,
      width: `${this.item.width}px`,
      borderRadius: this.item.borderRadius,
      borderColor: this.item.borderColor,
      color: this.item.textColor,
    };
  }

  get computedClass() {
    return {
      bordered: this.item.isBordered,
      clickable: this.item.isClickable,
    };
  }

  click() {
    if (!this.item.isClickable) return;

    this.$emit("click", this.item, this.$el);
  }

  onResized(newBottomOffset: number) {
    if (this.item.id != this._cloneItem.id) this.createClone();

    const newHeight = newBottomOffset - this._cloneItem.topOffset;

    console.log("topOffset", this._cloneItem.topOffset);

    this._cloneItem = calendarDayItemLogic.updateItemValuesWithTopOffset({
      item: this._cloneItem,
      hourHeight: this.hourHeight,
      newTopOffset: this._cloneItem.topOffset,
      startTime: this.startTime,
      newHeight,
    });

    this.showClone();
  }

  onResizeEnd() {
    this.hideClone();
    this.resize();
  }

  resize() {
    this.$emit("resize", this._cloneItem, this.$el);
  }
}
</script>
<style scoped lang="scss">
.calendar-item {
  position: absolute;
  box-sizing: border-box;
  .calendar-item__content {
    padding: 0.25rem;
    position: relative;
    box-sizing: border-box;
    height: inherit;
  }
  &.bordered {
    border-left: 5px solid;
  }
  &.clickable {
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
