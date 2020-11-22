import { Vue } from "vue-property-decorator";
import {CalendarEvent} from '../logic';
import {EnumCalendarDayItemPosition} from '../../src/logic/statics/calendar-day-item-position.enum'

export default class CalendarDayComponent extends Vue {
    readonly hasHeader: boolean;
    readonly startTime?: string;
    readonly endTime?: string;
    readonly hourHeight: number;
    readonly isHoursVisible: boolean;
    readonly isMinutesVisible: boolean;
    readonly Header?: string;
    readonly events: CalendarEvent[];
    readonly horizontalMarginBetweenItems: number;
    readonly minuteInterval: number;
    readonly hourPaddingRight: number;
    readonly isActionsDisabled: boolean;
    readonly isMinutesClickable: boolean;
    readonly isAreaSelectable: boolean;
    readonly newItemPosition: EnumCalendarDayItemPosition;
}
