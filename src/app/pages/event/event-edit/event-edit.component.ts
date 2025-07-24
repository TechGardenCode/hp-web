import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { PartyService } from '../../../services/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventDateTimePickerComponent } from '../../../components/event-date-time-picker/event-date-time-picker.component';
import { HousePartyEvent } from '../../../model/event.model';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-event-edit',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    EventDateTimePickerComponent,
  ],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css',
})
export class EventEditComponent implements OnInit {
  dateTimePickerVisible = false;
  selectedDate?: Date = this.getStartDateTime();
  today = new Date();
  imageUrl?: string;
  partyForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('Test', [Validators.required]),
    description: new FormControl(''),
    startDateTime: new FormControl<Date | null>(this.selectedDate as Date, [
      Validators.required,
    ]),
    createdBy: new FormControl(),
    hosts: new FormControl<any[]>([]),
    hostNickname: new FormControl(''),
    location: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required]),
    spots: new FormControl(0),
  });

  @HostBinding('class')
  get classList(): string {
    return this.dateTimePickerVisible ? 'overflow-y-hidden' : 'overflow-y-auto';
  }

  constructor(
    private readonly partyService: PartyService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const partyId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!partyId) {
      this.router.navigate(['..']);
      return;
    }
    this.partyService.getParty(partyId).subscribe({
      next: (party: HousePartyEvent) => {
        console.log(party.startDateTime);
        this.selectedDate = new Date(party.startDateTime);
        this.imageUrl = party.imageUrl;

        this.partyForm.patchValue({
          id: party.id,
          title: party.title,
          description: party.description,
          startDateTime: party.startDateTime,
          createdBy: party.createdBy,
          hosts: party.hosts,
          hostNickname: party.hostNickname,
          location: party.location,
          imageUrl: party.imageUrl,
          spots: party.spots,
        });
      },
    });
  }

  getStartDateTime() {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0, 0, 0);
    return now;
  }

  onDateTimeSelected(date: Date): void {
    this.selectedDate = date;
    this.partyForm.patchValue({ startDateTime: date });
    this.dateTimePickerVisible = false;
  }

  setImageUrl(url: string) {
    this.imageUrl = url;
    this.partyForm.patchValue({ imageUrl: url });
  }

  submitForm() {
    if (
      this.partyForm.invalid ||
      Object.values(this.partyForm.controls).some((control) => control.invalid)
    ) {
      console.error('Form is invalid');
      return;
    }

    const partyData = this.partyForm.value;
    console.log(partyData.startDateTime);
    this.updateParty(partyData);
  }

  updateParty(partyData: any) {
    return this.partyService.updateParty(partyData.id, partyData).subscribe({
      next: () => {
        this.partyForm.reset();
        this.selectedDate = undefined;
        this.router.navigate(['/event/detail', partyData.id]);
      },
      error: (error) => {
        console.error('Error creating party:', error);
      },
    });
  }
}
