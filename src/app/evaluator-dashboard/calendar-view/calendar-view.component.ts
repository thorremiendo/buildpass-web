import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { NullTemplateVisitor } from '@angular/compiler';
import * as moment from 'moment';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#fc4b6c',
    secondary: '#f9e7eb',
  },
  blue: {
    primary: '#1e88e5',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#ffb22b',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  public applicationDate = '2020,11,15';
  lastCloseResult = '';
  actionsAlignment = '';
  config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: '',
    },
    data: {
      action: '',
      event: [],
    },
  };
  numTemplateOpens = 0;

  view = 'month';

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'A2020-1',
      color: colors.red,
    },
    {
      start: new Date(this.applicationDate),
      title: 'A2020-2',
      color: colors.yellow,
    },
  ];

  activeDayIsOpen = true;

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) doc: any,
    private router: Router
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  // eventTimesChanged({
  //     event,
  //     newStart,
  //     newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //     event.start = newStart;
  //     event.end = newEnd;
  //     this.handleEvent('Dropped or resized', event);
  //     this.refresh.next();
  // }

  handleEvent(event: CalendarEvent): void {
    // this.config.data = { event };
    console.log(moment(event.start).format('YYYY,MM,DD'));
    this.router.navigateByUrl('/evaluator/application')
    // this.dialogRef = this.dialog.open(CalendarDialogComponent, this.config);

    // this.dialogRef.afterClosed().subscribe((result: string) => {
    //     this.lastCloseResult = result;
    //     this.dialogRef = Object.create(null);
    // });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    this.refresh.next();
  }
}
