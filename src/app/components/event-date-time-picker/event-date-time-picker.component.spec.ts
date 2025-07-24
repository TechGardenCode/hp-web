import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateDateTimePickerComponent } from './event-date-time-picker.component';

describe('EventCreateDateTimePickerComponent', () => {
  let component: EventCreateDateTimePickerComponent;
  let fixture: ComponentFixture<EventCreateDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreateDateTimePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreateDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
