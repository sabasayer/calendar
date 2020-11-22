import { timeLogic } from "./time.logic";
import { CalendarHour } from 'types/logic/calendar-hour';
import { MinuteInterval } from "types/logic/minute-interval";

class CalendarHourLogic {
  createHoursArray(
    startTime: string,
    endTime: string
  ): CalendarHour[] {
    const startHour = timeLogic.getTimeSpan(startTime).hour;
    const endHour = timeLogic.getTimeSpan(endTime).hour;

    let hours:CalendarHour[] = [];

    for (let i = startHour; i <= endHour; i++)
      hours.push({
        value: i,
        text: timeLogic.createTwoDigitText(i),
      });

    return hours;
  }

  createMinutes(hour: number, minuteInterval: number): MinuteInterval[] {
    let minutes: MinuteInterval[] = [];

    for (let i = 0; i < 60; i += minuteInterval) {
      const interval = this.createMinuteInterval({
        hour,
        minuteInterval,
        startMinute: i,
      });

      minutes.push(interval);
    }

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
      endMinute = 0;
      endHour++;
    }

    let endMinuteText = timeLogic.createTwoDigitText(endMinute);
    let endHourText = timeLogic.createTwoDigitText(endHour);

    return {
      from: `${startHourText}:${startMinuteText}`,
      to: `${endHourText}:${endMinuteText}`,
      text: startMinuteText,
    };
  }
}

export const calendarHourLogic = new CalendarHourLogic();
