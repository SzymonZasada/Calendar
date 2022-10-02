import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { eventDataInterface, eventDataType } from '../calendar-event/calendar-event.component';
import { RestService } from '../../services/rest-service/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit {

  durationTime = 5000;

  events: eventDataType[] = ['sport', 'culture', 'health', 'friends', 'work', 'family'];
  icons: string[] = ['cake', 'business', 'child_care', 'free_breakfast', 'add_shopping_cart', 'book', 'commute'];
  calendarForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    place: new FormControl('', [Validators.required])
  });

  constructor(private _restService: RestService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  checkValidation() {
    return this.calendarForm.valid;
  }

  markAsInvalid() {
    this.calendarForm.markAllAsTouched();
  }

  prepareObjectToSend() {
    let object: Record<string, string | number | eventDataType | Date> = {};
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
    return object as unknown as eventDataInterface;
  }

  sendData() {
    return this._restService.postNewEvent(this.prepareObjectToSend()).subscribe({
      error: () => this._snackBar.open('Error in sending', 'Ok', { duration: this.durationTime }),
      complete: () => {
        this.cleanAllInput(),
          this._snackBar.open('Successfully sent', 'Ok', { duration: this.durationTime });
      }
    });
  }

  cleanAllInput() {
    this.calendarForm.reset();
  }

  cleanForm() {
    this.cleanAllInput();
  }

  addNewEvent() {
    this.checkValidation() ? this.sendData() : this.markAsInvalid();
  }
}
