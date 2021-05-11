import { timeLogic } from './time.logic';
import { CalendarHour } from '../../types/logic/calendar-hour';
import { MinuteInterval } from "../../types/logic/minute-interval";
import { MinuteType } from 'types/logic/minute-composite';

class CalendarHourLogic {
  static times: MinuteType[] = []

  createHoursArray(
    startTime: string,
    endTime: string
  ): CalendarHour[] {
    const startHour = timeLogic.getTimeSpan(startTime).hour;
    const endHour = timeLogic.getTimeSpan(endTime).hour;
    let hours: CalendarHour[] = [];

    for (let i = startHour; i <= endHour; i++)
      hours.push({
        value: i,
        text: timeLogic.createTwoDigitText(i),
      });

    return hours;
  }

  createAllMinutes(startTime: string, endTime: string, minuteInterval: number): MinuteInterval[] {
    let minutes: MinuteInterval[] = [];

    const totalMinutes = timeLogic.totalMinutesInTimeSpan(endTime) - timeLogic.totalMinutesInTimeSpan(startTime)
    const count = Math.floor(totalMinutes / minuteInterval);
    let start = startTime;

    for (let index = 0; index <= count; index++) {
      let to = timeLogic.addMinutesToTimeSpanText(start, minuteInterval)
      let interval = timeLogic.totalMinutesInTimeSpan(to) - timeLogic.totalMinutesInTimeSpan(start)
      let startHour = start.split(":")[0];
      let startMinute = start.split(":")[1];
      if (index == count && endTime != to) {
        to = endTime;
        interval =timeLogic.totalMinutesInTimeSpan(to) - timeLogic.totalMinutesInTimeSpan(start)

      }

      minutes.push({ from: start, to: to, interval: interval, text: startMinute, hour: { value: +startHour, text: timeLogic.createTwoDigitText(+startHour) } })
      start = to;

    }
    return minutes;
  }
  
}

export const calendarHourLogic = new CalendarHourLogic();
