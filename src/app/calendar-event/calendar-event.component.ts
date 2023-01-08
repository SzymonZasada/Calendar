import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest-service/rest.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from '../../services/date-service/date.service';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css'],
})
export class CalendarEventComponent implements OnInit, OnDestroy {
  durationTime = 5000;

  currentDate$!: Observable<unknown>;
  currentTime$!: Observable<unknown>;
  currentDate = new Date();
  events: eventDataInterface[] = [];
  todayIndex!: number[];

  constructor(
    private _restService: RestService,
    private _snackBar: MatSnackBar,
    private _dateService: DateService,
    private _navigationService: NavigationService
  ) {
    this.currentDate$ = this._dateService.getDate();
    this.currentTime$ = this._dateService.getTime();
  }

  ngOnInit(): void {
    this.getEvent().subscribe();
  }

  ngOnDestroy() {}

  getEvent() {
    return this._restService.getAllEvent().pipe(
      /* sort by date */
      map((events) =>
        events.sort(
          (a: eventDataInterface, b: eventDataInterface) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      ),
      /*add event time property */
      map((el: eventDataInterface[]) => this.checkEventDay(el)),
      catchError((err) => {
        console.error('Get data', err);
        this._snackBar.open('Server error', 'Ok', {
          duration: this.durationTime,
        });
        return throwError(err);
      })
    );
  }

  checkEventDay(event: eventDataInterface[]) {
    const todayDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en_US');
    event.forEach((el) => {
      const eventDate = formatDate(el.date, 'yyyy-MM-dd', 'en_US');

      /*parse date string to user date*/
      el.date = formatDate(el.date, 'yyyy-MM-dd', 'en_US');

      if (eventDate == todayDate) {
        return (el.event = 'today');
      }
      if (eventDate > todayDate) {
        return (el.event = 'incoming');
      }
      if (eventDate < todayDate) {
        return (el.event = 'ended');
      }

      return (el.event = 'error');
    });
    this.events = [...event];
  }

  addEvent() {
    this._navigationService.navigateToRoute('newEventCalendar');
  }
}

export interface eventDataInterface {
  id?: number;
  title: string;
  date: string | Date;
  description: string;
  icon: string;
  eventType: eventDataType;
  telephoneNumber: string;
  email: string;
  place: string;
  event: string;
}

export type eventDataType =
  | 'sport'
  | 'culture'
  | 'health'
  | 'friends'
  | 'work'
  | 'family';
