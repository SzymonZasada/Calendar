import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDataInterface } from '../../models/calendar/interfaces-types/event-data-calendar';

const URL_API = 'http://localhost:8000/api/';
const EVENTS = 'events';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private _httpClient: HttpClient) {}

  getAllEvent(): Observable<EventDataInterface[]> {
    return this._httpClient.get<EventDataInterface[]>(`${URL_API}${EVENTS}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  postNewEvent(data: EventDataInterface): Observable<EventDataInterface> {
    return this._httpClient.post<EventDataInterface>(`${URL_API}${EVENTS}`, data);
  }
}
