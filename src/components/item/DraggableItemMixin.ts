import { CalendarDayItem } from "@/logic/types/calendar-day-item";
import { Vue, Component, Prop, Emit, PropSync, Mixins } from "vue-property-decorator";
import { draggableItemLogic } from "@/logic/draggable-item.logic";
import { calendarDayItemLogic } from "@/logic/calendar-day-item.logic";
import DragTrackerMixin from '@/components/DragTrackerMixin';

@Component
export default class DraggableItemMixin extends Mixins(DragTrackerMixin) {
  @Prop({ required: true }) readonly item: CalendarDayItem;
  @Prop({ type: Number, default: 100 }) readonly hourHeight: number;
  @Prop({ type: Number, default: 30 }) readonly minuteInterval: number;
  @Prop({ type: String, default: "00:00" }) readonly startTime: string;
  @PropSync("isCloneVisible", { type: Boolean, default: false })
  _isCloneVisible: boolean;
  @PropSync("cloneItem")
  _cloneItem: CalendarDayItem;

  mouseDown(ev: MouseEvent) {
    if (!this.item.isDraggable) return;
    
    this.calculateFirstTopOffset(ev,this.item.topOffset);
    this.createClone();
    this.createMouseMoveListener();
    this.createMouseUpListener();
  }

  createClone() {
    this._cloneItem = draggableItemLogic.createClone(this.item);
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

  drop() {
    this.$emit("drop", this._cloneItem, this.$el);
  }

}
