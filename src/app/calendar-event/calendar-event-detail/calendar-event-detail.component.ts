import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EventDataInterface } from '../../../models/calendar/interfaces-types/event-data-calendar';

@Component({
  selector: 'app-calendar-event-detail',
  templateUrl: './calendar-event-detail.component.html',
  styleUrls: ['./calendar-event-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventDetailComponent implements OnInit {
  @Input() public eventDetail: EventDataInterface;

  constructor() {}

  ngOnInit(): void {}
}
