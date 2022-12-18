import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { eventDataInterface } from '../../app/calendar-event/calendar-event.component';

const URL_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private _httpClient: HttpClient) {
  }

  getAllEvent(): Observable<eventDataInterface[]> {
    return this._httpClient.get<eventDataInterface[]>(`${URL_API}events`, { observe: 'body', responseType: 'json' });
  }

  postNewEvent(data: eventDataInterface): Observable<eventDataInterface> {
    console.log(data)
    return this._httpClient.post<eventDataInterface>(`${URL_API}events`, data);
  }

}


