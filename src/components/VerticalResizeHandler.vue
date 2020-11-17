<template>
  <div @mousedown.stop="mouseDown" class="vertica-resize-handle"></div>
</template>
<script lang="ts">
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import { Component, Emit, Mixins, Prop, Vue } from "vue-property-decorator";
import DragTrackerMixin from "./DragTrackerMixin";

@Component
export default class VerticalResizeHandlerComponent extends Mixins(
  DragTrackerMixin
) {
  @Prop({ type: Number, required: true }) readonly topOffset: number;
  @Prop({ type: Number, required: true }) readonly minuteInterval: number;
  @Prop({ type: Number, required: true }) readonly hourHeight: number;

  mouseDown(ev: MouseEvent) {
    this.calculateFirstTopOffset(ev, this.topOffset);
    this.resizeStart();
    this.createMouseMoveListener();
    this.createMouseUpListener();
  }

  mouseMove(ev: MouseEvent) {
    ev.preventDefault();
    const newTopOffset = this.calculateNewTopOffset(ev.pageY);

    if (this.topOffset != newTopOffset) this.resize(newTopOffset);
  }

  calculateNewTopOffset(pageY: number) {
    let newTopOffset = draggableItemLogic.calculateNewTop(
      pageY,
      this.firstTopOffset
    );

    newTopOffset = draggableItemLogic.snapToMinute({
      topOffset: newTopOffset,
      minuteInterval: this.minuteInterval,
      hourHeight: this.hourHeight,
    });

    return newTopOffset;
  }

  mouseUp() {
    this.removeListeners();
    this.resizeEnd();
  }

  @Emit()
  resizeStart() {}

  @Emit()
  resize(offset: number) {}

  @Emit()
  resizeEnd() {}
}
</script>
<style scoped>
.vertica-resize-handle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  cursor: n-resize;
}
</style>
