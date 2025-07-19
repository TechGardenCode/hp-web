import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailInviteComponent } from './event-detail-invite.component';

describe('EventDetailInviteComponent', () => {
  let component: EventDetailInviteComponent;
  let fixture: ComponentFixture<EventDetailInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailInviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
