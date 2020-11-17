import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop, Emit, PropSync } from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";

@Component
export default class CalendarItemComponent extends Vue {
  @Prop({ required: true }) readonly item: CalendarDayItem;
  @Prop({ type: Number, default: 100 }) readonly hourHeight: number;
  @Prop({ type: Number, default: 30 }) readonly minuteInterval: number;
  @Prop({ type: String, default: "00:00" }) readonly startTime: string;
  @PropSync("isCloneVisible", { type: Boolean, default: false })
  _isCloneVisible: boolean;
  @PropSync("cloneItem")
  _cloneItem: CalendarDayItem;

  firstTopOffset: number = 0;

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
    this._cloneItem = draggableItemLogic.createClone(this.item);
  }

  createMouseMoveListener() {
    document.addEventListener("mousemove", this.mouseMove);
  }

  createMouseUpListener() {
    document.addEventListener("mouseup", this.mouseUp);
  }

  showClone() {
    if (!this._isCloneVisible) this._isCloneVisible = true;
  }

  hideClone() {
    if (this._isCloneVisible) this._isCloneVisible = false;
  }

  mouseMove(ev: MouseEvent) {
    ev.preventDefault();

    const newTopOffset = this.calculateNewTopOffset(ev.pageY);
    this.handleNewTopOffset(newTopOffset);

    this.showClone();
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

  isTopOffsetChanged(topOffset: number): boolean {
    return this._cloneItem.topOffset !== topOffset;
  }

  handleNewTopOffset(topOffset: number) {
    if (!this.isTopOffsetChanged(topOffset)) return;

    this._cloneItem = calendarDayItemLogic.updateItemValuesWithTopOffset({
      item: this._cloneItem as CalendarDayItem,
      hourHeight: this.hourHeight,
      newTopOffset: topOffset,
      startTime: this.startTime,
    });
  }

  calculateTimeSpanFromTopOffset(topOffset: number) {
    return calendarDayItemLogic.calculateTimeSpanFromTopOffset({
      topOffset,
      hourHeight: this.hourHeight,
      startTime: this.startTime,
    });
  }

  mouseUp() {
    this.removeListeners();
    this.hideClone();

    if (this.isCloneMoved()) this.drop();
  }

  isCloneMoved() {
    return this.item.topOffset != this._cloneItem.topOffset;
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

  drop() {
    this.$emit("drop", this._cloneItem, this.$el);
  }

  beforeDestroy() {
    this.removeListeners();
  }
}
