import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventDetailComponent } from './calendar-event-detail.component';

describe('CalendarEventDetailComponent', () => {
  let component: CalendarEventDetailComponent;
  let fixture: ComponentFixture<CalendarEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
