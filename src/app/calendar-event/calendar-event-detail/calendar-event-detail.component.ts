import {Component, Input, OnInit} from '@angular/core';
import {eventDataInterface} from "../calendar-event.component";

@Component({
  selector: 'app-calendar-event-detail',
  templateUrl: './calendar-event-detail.component.html',
  styleUrls: ['./calendar-event-detail.component.css']
})
export class CalendarEventDetailComponent implements OnInit {

  @Input() eventDetail!:eventDataInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
