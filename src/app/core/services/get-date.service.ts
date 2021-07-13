import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDateService {
  constructor() {}

  isWeekend() {
    var date = new Date();
    return date.getDay() === 6 || date.getDay() === 0;
  }

  isWorkHours() {
    var date = new Date();

    var startTime = '08:00:00';
    var endTime = '17:00:00';

    var s = startTime.split(':');
    var dt1 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(s[0]),
      parseInt(s[1]),
      parseInt(s[2])
    );

    var e = endTime.split(':');
    var dt2 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(e[0]),
      parseInt(e[1]),
      parseInt(e[2])
    );

    return date >= dt1 && date <= dt2 ? true : false;
  }
}
