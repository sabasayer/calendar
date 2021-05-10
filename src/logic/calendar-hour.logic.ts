import { timeLogic } from '@/logic/time.logic';
import { TimeSpan } from './../../types/logic/time-span';
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

  createMinutes(hour: number, minuteInterval: number): MinuteInterval[] {
    let minutes: MinuteInterval[] = [];

    const times = CalendarHourLogic.times.find(t => t.hour == hour - 1)?.values;
    let i = 0
    if (times?.length) i = +times[times?.length - 1].to.split(":")[1];

    for (i; i < 60; i += minuteInterval) {
      const interval = this.createMinuteInterval({
        hour,
        minuteInterval,
        startMinute: i,
      });

      minutes.push(interval);
    }

    CalendarHourLogic.times.push({ hour: hour, values: minutes })
    return minutes;
  }

  createMinuteInterval(options: {
    hour: number;
    startMinute: number;
    minuteInterval: number;
  }): MinuteInterval {
    let startMinute = options.startMinute;
    let startMinuteText = timeLogic.createTwoDigitText(startMinute);
    let startHourText = timeLogic.createTwoDigitText(options.hour);

    let endMinute = startMinute + options.minuteInterval;
    let endHour = options.hour;

    if (endMinute >= 60) {
      if (this.isLastHourOfDay(options)) { endMinute = 59; }
      else ({ endMinute, endHour } = this.getEndMinuteAndHour(endMinute, startMinute, options, endHour));
    }

    let endMinuteText = timeLogic.createTwoDigitText(endMinute);
    let endHourText = timeLogic.createTwoDigitText(endHour);

    return {
      from: `${startHourText}:${startMinuteText}`,
      to: `${endHourText}:${endMinuteText}`,
      text: startMinuteText,
      interval: timeLogic.totalMinutesInTimeSpan(`${endHourText}:${endMinuteText}`) - timeLogic.totalMinutesInTimeSpan(`${startHourText}:${startMinuteText}`)
    };
  }

  private getEndMinuteAndHour(endMinute: number, startMinute: number, options: { hour: number; startMinute: number; minuteInterval: number; }, endHour: number) {
    endMinute = ((60 - startMinute) - options.minuteInterval) * -1;
    endHour++;
    return { endMinute, endHour };
  }

  private isLastHourOfDay(options: { hour: number; startMinute: number; minuteInterval: number; }) {
    return options.hour == 23;
  }


}

export const calendarHourLogic = new CalendarHourLogic();
