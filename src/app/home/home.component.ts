import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private _navigationService: NavigationService) {}

  ngOnInit(): void {}

  goToCalendar(): void {
    this._navigationService.navigateToRoute('calendar');
  }

  addNewEvent(): void {
    this._navigationService.navigateToRoute('newEventCalendar');
  }
}
