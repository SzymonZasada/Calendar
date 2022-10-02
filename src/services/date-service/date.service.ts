import { Injectable } from '@angular/core';
import { interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _date = new Date();

  constructor() {
  }

  getDate() {
    return interval(1000).pipe(map(() => this.getDateDays()));
  }

  getTime() {
    return interval(1000).pipe(map(() => this.getMinutes()));
  }

  private getDateDays() {
    this._date.setSeconds(this._date.getSeconds() + 1);
    return (
      this._date.toDateString()
    );
  }

  private getMinutes() {
    this._date.setSeconds(this._date.getSeconds());
    return this._date.getHours() +
      ':' +
      this._date.getMinutes() +
      ':' +
      this._date.getSeconds();
  }

}
