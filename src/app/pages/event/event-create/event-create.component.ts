import { Component, HostBinding } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { ButtonDirective } from '../../../components/button/button.directive';
import { EventCreateDateTimePickerComponent } from './event-create-date-time-picker/event-create-date-time-picker.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PartyService } from '../../../services/party.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  imports: [
    HeaderComponent,
    ButtonDirective,
    CommonModule,
    EventCreateDateTimePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css',
  host: {
    class: 'h-full',
  },
})
export class EventCreateComponent {
  dateTimePickerVisible = false;
  selectedDate?: Date = this.getStartDateTime();
  today = new Date();
  imageUrl?: string;
  partyForm = new FormGroup({
    title: new FormControl('Test', [Validators.required]),
    description: new FormControl(''),
    startDateTime: new FormControl<Date | null>(this.selectedDate as Date, [
      Validators.required,
    ]),
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
    private readonly http: HttpClient,
    private readonly partyService: PartyService,
    private router: Router
  ) {
    this.getSampleImage();
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

  getSampleImage() {
    this.http.get('https://picsum.photos/360').subscribe({
      next: (response: any) => {
        this.setImageUrl(response.url);
      },
      error: (error) => {
        if (error.status === 200) {
          this.setImageUrl(error.url);
        }
      },
    });
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
    this.createParty(partyData);
  }

  createParty(partyData: any) {
    return this.partyService.createParty(partyData).subscribe({
      next: (response) => {
        this.partyForm.reset();
        this.selectedDate = undefined;
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating party:', error);
      },
    });
  }
}
