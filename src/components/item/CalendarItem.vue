<template>
  <div
    @click="click"
    @mousedown="mouseDown"
    class="calendar-item"
    :style="computedStyle"
    :class="computedClass"
  >
    <slot>
      <span>{{ item.title }}</span>
    </slot>

    <calendar-item-clone v-if="isCloneVisible" :item="cloneItem" />
  </div>
</template>

<script lang="ts">
import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop, Emit, Mixins } from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import DraggableItemMixin from "./DraggableItemMixin";

@Component({
  components: {
    "calendar-item-clone": () => import("./CalendarItem.vue"),
  },
})
export default class CalendarItemComponent extends Mixins(DraggableItemMixin) {
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
}
</script>
<style scoped lang="scss">
.calendar-item {
  position: absolute;
  padding: 0.25rem;
  box-sizing: border-box;
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
