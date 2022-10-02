import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private _router: Router) {
  }

  navigateToRoute(path: navigationStringsType) {
    const usePath = navigationPaths[path].path;
    this._router.navigate([usePath]);
  }
}

export type navigationStringsType = 'calendar' | 'newEventCalendar' | 'home';

const navigationPaths: Record<navigationStringsType, pathToExecute> = {
  home: { path: '/home' },
  calendar: { path: '/calendar' },
  newEventCalendar: { path: '/new-event' }
};

export interface pathToExecute {
  path: string;
}
