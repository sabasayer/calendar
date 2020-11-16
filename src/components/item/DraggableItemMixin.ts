import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";

@Component
export default class CalendarItemComponent extends Vue {
  @Prop({ required: true }) readonly item: CalendarDayItem;
  @Prop({ type: Number, default: 100 }) readonly hourHeight: number;
  @Prop({ type: Number, default: 30 }) readonly minuteInterval: number;

  firstTopOffset: number = 0;
  isCloneVisible: boolean = false;
  cloneItem: Partial<CalendarDayItem> = {};

  mouseDown(ev: MouseEvent) {
    if (!this.item.isDraggable) return;

    this.calculateFirstTopOffset(ev);
    this.createClone();
    this.createMouseMoveListener();
    this.createMouseUpListener();
  }

  calculateFirstTopOffset(ev: MouseEvent) {
    this.firstTopOffset = draggableItemLogic.calculateRelativeTop(
      ev.pageY,
      this.item.topOffset
    );
  }

  createClone() {
    this.cloneItem = draggableItemLogic.createClone(this.item);
  }

  createMouseMoveListener() {
    document.addEventListener("mousemove", this.mouseMove);
  }

  createMouseUpListener() {
    document.addEventListener("mouseup", this.mouseUp);
  }



  mouseMove(ev: MouseEvent) {
    ev.preventDefault();

    const newTopOffset = this.calculateNewTopOffset(ev.pageY);

    this.setCloneTopOffset(newTopOffset);
    this.isCloneVisible = true;
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

  setCloneTopOffset(topOffset: number) {
    if (this.cloneItem.topOffset != topOffset)
      this.cloneItem.topOffset = topOffset;
  }



  mouseUp() {
    this.removeListeners();
    this.isCloneVisible = false;
    this.drop();
  }

  removeMouseMoveListener() {
    document.removeEventListener("mousemove", this.mouseMove);
  }

  removeMouseUpListener() {
    document.removeEventListener("mouseup", this.mouseUp);
  }

  removeListeners() {
    this.removeMouseMoveListener();
    this.removeMouseUpListener();
  }

  @Emit()
  drop() {
    return this.cloneItem;
  }

  beforeDestroy() {
    this.removeListeners();
  }
}
