import { CalendarHour } from './calendar-hour';
import type { TimeInterval } from "./time-interval";

interface MinuteInterval extends TimeInterval {
  text: string;
  hour?: CalendarHour
  interval: number
}

export type { MinuteInterval };
