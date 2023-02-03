import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, takeUntil, throwError } from 'rxjs';
import { DateFormat } from '../../models/calendar/enums/date-format';
import { Errors } from '../../models/calendar/enums/errors';
import { MatDialogMessage } from '../../models/calendar/enums/mat-dialog';
import { EventDataInterface } from '../../models/calendar/interfaces-types/event-data-calendar';
import { DateService } from '../../services/date-service/date.service';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { RestService } from '../../services/rest-service/rest.service';
import { Destroyable } from '../helpers/Destroyable';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventComponent extends Destroyable implements OnInit {
  private durationTime = 5000;
  private currentDate = new Date();

  public currentDate$: Observable<string>;
  public currentTime$: Observable<string>;
  public events: EventDataInterface[] = [];
  public DateFormat = DateFormat;

  constructor(
    private _restService: RestService,
    private _snackBar: MatSnackBar,
    private _dateService: DateService,
    private _navigationService: NavigationService,
    private _detect: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentDate$ = this._dateService.getDate();
    this.currentTime$ = this._dateService.getTime();
    this.getEvent().subscribe();
  }

  getEvent(): Observable<void> {
    return this._restService.getAllEvent().pipe(
      takeUntil(this.destroyed$),
      /* sort by date */
      map((events) =>
        events.sort(
          (a: EventDataInterface, b: EventDataInterface) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      ),
      /*add event time property */
      map((el: EventDataInterface[]) => this.checkEventDay(el)),
      catchError((err) => {
        console.error('Get data', err);
        this._snackBar.open(MatDialogMessage.SERVER_ERROR, MatDialogMessage.OK, {
          duration: this.durationTime,
        });
        return throwError(err);
      })
    );
  }

  checkEventDay(event: EventDataInterface[]): void {
    const todayDate = formatDate(this.currentDate, DateFormat.STANDART, DateFormat.LOCALE);
    event.forEach((el) => {
      const eventDate = formatDate(el.date, DateFormat.STANDART, DateFormat.LOCALE);

      /*parse date string to user date*/
      el.date = formatDate(el.date, DateFormat.STANDART, DateFormat.LOCALE);

      if (eventDate == todayDate) {
        return (el.event = DateFormat.TODAY);
      }
      if (eventDate > todayDate) {
        return (el.event = DateFormat.INCOMING);
      }
      if (eventDate < todayDate) {
        return (el.event = DateFormat.ENDED);
      }

      return (el.event = Errors.ERROR);
    });

    this.events = [...event];
    //return events;
  }

  addEvent(): void {
    this._navigationService.navigateToRoute('newEventCalendar');
  }
}
