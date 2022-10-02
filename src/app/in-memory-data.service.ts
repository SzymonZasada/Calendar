import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let events = [
      {
        id: 1,
        title: 'Moms birthday',
        date: 'Sat Oct 1 2022 19:44:38 GMT+0200',
        description: 'buy a bike',
        icon: 'cake',
        eventType: 'family',
        telephoneNumber: '123485663',
        email: 'momemail@gmail.com',
        place: 'Parent house'
      },
      {
        id: 2,
        title: 'Dads birthday',
        date: 'Fri Sep 30 2022 00:00:00 GMT+0200',
        description: 'buy a car',
        icon: 'cake',
        eventType: 'family',
        telephoneNumber: '958473664',
        email: 'dademail@gmail.com',
        place: 'Parent house'
      },
      {
        id: 3,
        title: 'Business meeting',
        date: 'Fri Oct 07 2022 00:00:00 GMT+0200',
        description: 'Remember about business cards',
        icon: 'business',
        eventType: 'work',
        telephoneNumber: '958473664',
        email: 'work@work.com',
        place: 'work'
      },
      {
        id: 4,
        title: 'Kindergarten',
        date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
        description: 'Pick up my son',
        icon: 'child_care',
        eventType: 'family',
        telephoneNumber: '746357442',
        email: 'kindergarden@gmail.com',
        place: 'Kindergarten'
      },
      {
        id: 5,
        title: 'Meeting with Dominika',
        date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
        description: 'Ask for a new job',
        icon: 'free_breakfast',
        eventType: 'friends',
        telephoneNumber: '123485663',
        email: 'myfriend@gmail.com',
        place: 'Giant hotel'
      },
      {
        id: 5,
        title: 'Order a cake',
        date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
        description: 'Order a chocolate cake for mom',
        icon: 'cake',
        eventType: 'family',
        telephoneNumber: '452345',
        email: 'cakedelivery@gmail.com',
        place: 'Cake shop on honey street'
      }

    ];
    return { events };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

}

