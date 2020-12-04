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
        <div>
          <div>{{ item.title }}</div>
          <div>{{ item.from }} - {{ item.to }}</div>
        </div>
      </slot>

      <vertical-resize-handler
        v-if="isResizeHandlerVisible"
        @resize-start="onResizeStart"
        @resize="onResized"
        @resize-end="onResizeEnd"
        :hour-height="hourHeight"
        :minute-interval="minuteInterval"
        :top-offset="topOffset"
        :min-top-offset="item.topOffset"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CalendarDayItem } from "types/logic/calendar-day-item";
import {
  Vue,
  Component,
  Prop,
  Emit,
  Mixins,
  Watch,
} from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import DraggableItemMixin from "./DraggableItemMixin";
import VerticalResizeHandlerComponent from "../VerticalResizeHandler.vue";
import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";
import { resizeLogic } from "@/logic/resize.logic";

@Component({
  components: {
    "vertical-resize-handler": VerticalResizeHandlerComponent,
  },
})
export default class CalendarItemComponent extends Mixins(DraggableItemMixin) {
  @Prop({ type: Boolean, default: false }) readonly isGhost: boolean;

  get isResizeHandlerVisible() {
    return this.item.isResizable && !this.disabled;
  }

  get isChanging() {
    return this._isCloneVisible && this._cloneItem.id === this.item.id;
  }

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
      draggable: this.item.isDraggable,
      ghost: this.isGhost,
      "cannot-drop": this.item.cannotDrop,
      changing: this.isChanging,
    };
  }

  click() {
    if (!this.item.isClickable || this.disabled) return;

    this.$emit("click", this.item, this.$el);
  }

  onResizeStart() {
    this.createClone();
  }

  onResized(newBottomOffset: number) {
    let newHeight = newBottomOffset - this._cloneItem.topOffset;

    newHeight = resizeLogic.fixHeightByClosestBlockingPosition({
      topOffset: this._cloneItem.topOffset,
      height: newHeight,
      startTime: this.startTime,
      endTime: this.endTime,
      hourHeight: this.hourHeight,
      closestBlockingPosition: this.item.closestBlockingPosition,
    });

    if (
      !calendarDayItemLogic.isVerticalValuesChanged({
        item: this._cloneItem,
        topOffset: this._cloneItem.topOffset,
        height: newHeight,
      })
    )
      return;

    this._cloneItem = calendarDayItemLogic.updateItemTimeValues({
      item: this._cloneItem,
      hourHeight: this.hourHeight,
      newTopOffset: this._cloneItem.topOffset,
      startTime: this.startTime,
      newHeight: newHeight,
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
@import "@/style/definitions.scss";

.calendar-item {
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 0.75rem;
  .calendar-item__content {
    padding: 0.25rem;
    position: relative;
    box-sizing: border-box;
    height: inherit;
  }
  &.bordered {
    border-left: 5px solid;
  }
  &.clickable,
  &.draggable {
    @include clickable;
  }
  &.ghost {
    outline: 2px solid steelblue;
    border: 2px solid white;
    cursor: move;
    z-index: 20 !important;
    &.cannot-drop {
      outline-color: red;
      cursor: no-drop;
    }
  }
  &.changing {
    opacity: 0.5;
  }
}
</style>
