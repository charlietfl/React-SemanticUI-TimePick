export default class Utils {
  static parseDisplayTime(newState) {
    const displayHour = !isNaN(newState.hour) ? newState.hour : "--";
    const displayMinute = !isNaN(newState.minute)
      ? this.padNumber(newState.minute)
      : "--";

    return displayHour + ":" + displayMinute + " " + newState.meridian;
  }

  static padNumber(num) {
    return ("0" + num).slice(-2);
  }

  static parseTimeProp(str) {
    let meridian = /am|pm$/i.exec(str);
    const timeParts = str
      .trim()
      .replace(/\s+|[A-Z]/gi, "")
      .split(":")
      .map(Number);
    if (meridian && timeParts.length === 2) {
      meridian = meridian[0].toUpperCase();
      return {
        meridian: meridian,
        hour: timeParts[0],
        minute: timeParts[1]
      };
    } else {
      return false;
    }
  }

  static parseDateToTimeObj(d, minuteSteps){
    console.warn("valid date in checkDateProp()");
    let hour = d.getHours();
    let minutes =
      Math.round(d.getMinutes() /minuteSteps) * minuteSteps;
    console.log(minutes);

    let obj = {
      hour: hour > 12 ? hour - 12 : hour,
      minute: minutes,
      meridian: hour < 12 ? "AM" : "PM"
    };
    if (minutes == 60) {
      obj.hour++;
      obj.minute = 0;
    }
    obj.displayTime = this.parseDisplayTime(obj);
    return obj
  }
}
