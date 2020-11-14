import { TimeSpan } from "./types/time-span";

class TimeLogic {
  getTimeSpan(timeSpanText: string): TimeSpan {
    const splitted = timeSpanText.split(":");

    if (splitted.length >= 2)
      return {
        hour: +splitted[0],
        minute: +splitted[1],
      };

    throw `${timeSpanText} is not a valid timespan`;
  }

  totalMinutesInTimeSpan(timeSpanText: string): number {
    const timeSpan = this.getTimeSpan(timeSpanText);
    return timeSpan.hour * 60 + timeSpan.minute;
  }
}

export const timeLogic = new TimeLogic();
