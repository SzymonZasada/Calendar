import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { MatDialogMessage } from '../../models/calendar/enums/mat-dialog';
import { EventDataInterface, EventDataType } from '../../models/calendar/interfaces-types/event-data-calendar';
import { RestService } from '../../services/rest-service/rest.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFormComponent implements OnInit {
  private durationTime = 5000;

  public events: Observable<EventDataType[]> = of(['sport', 'culture', 'health', 'friends', 'work', 'family']);
  public icons: Observable<string[]> = of([
    'cake',
    'business',
    'child_care',
    'free_breakfast',
    'add_shopping_cart',
    'book',
    'commute',
  ]);
  public calendarForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    place: new FormControl('', [Validators.required]),
  });

  constructor(private _restService: RestService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  checkValidation(): boolean {
    return this.calendarForm.valid;
  }

  markAsInvalid(): void {
    this.calendarForm.markAllAsTouched();
  }

  prepareObjectToSend(): EventDataInterface {
    let object: Record<string, string | number | EventDataType | Date> = {};
    Object.entries(this.calendarForm.controls).forEach(([key, value]) => {
      //date is object value
      if (typeof value.value !== 'object') {
        object[key] = value.value;
      }
      if (typeof value.value === 'object') {
        const date = new Date(value.value as unknown as Date);
        object[key] = date;
      }
    });
    return object as unknown as EventDataInterface;
  }

  sendData(): Subscription {
    return this._restService.postNewEvent(this.prepareObjectToSend()).subscribe({
      error: () =>
        this._snackBar.open(MatDialogMessage.SENDING_ERROR, MatDialogMessage.OK, {
          duration: this.durationTime,
        }),
      complete: () => {
        this.cleanAllInput(),
          this._snackBar.open(MatDialogMessage.SENDING_SUCCESSFULL, MatDialogMessage.OK, {
            duration: this.durationTime,
          });
      },
    });
  }

  cleanAllInput(): void {
    this.calendarForm.reset();
  }

  cleanForm(): void {
    this.cleanAllInput();
  }

  addNewEvent(): void {
    this.checkValidation() ? this.sendData() : this.markAsInvalid();
  }
}
