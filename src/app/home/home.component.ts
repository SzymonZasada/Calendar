import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  goToCalendar(){
this._navigationService.navigateToRoute('calendar')
  }

  addNewEvent(){
    this._navigationService.navigateToRoute('newEventCalendar')
  }

}
