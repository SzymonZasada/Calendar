import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
})
export class TabBarComponent implements OnInit {
  constructor(private _navigationService: NavigationService) {}

  ngOnInit(): void {}

  goToHome() {
    this._navigationService.navigateToRoute('home');
  }

  goToCalendar() {
    this._navigationService.navigateToRoute('calendar');
  }

  addNewEvent() {
    this._navigationService.navigateToRoute('newEventCalendar');
  }
}
