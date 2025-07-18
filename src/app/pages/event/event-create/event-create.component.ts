import { Component, HostBinding } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { ButtonDirective } from '../../../components/button/button.directive';
import { EventCreateDateTimePickerComponent } from './event-create-date-time-picker/event-create-date-time-picker.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PartyService } from '../../../services/party.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  selectedDate?: Date;
  today = new Date();
  imageUrl?: string;
  partyForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    startDateTime: new FormControl<Date | null>(null),
    hostNickname: new FormControl(''),
    location: new FormControl(''),
    imageUrl: new FormControl(''),
    spots: new FormControl(0),
  });

  @HostBinding('class')
  get classList(): string {
    return this.dateTimePickerVisible ? 'overflow-y-hidden' : 'overflow-y-auto';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly partyService: PartyService
  ) {
    this.getSampleImage();
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
    if (this.partyForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const partyData = this.partyForm.value;
    this.createParty(partyData);
  }

  createParty(partyData: any) {
    return this.partyService.createParty(partyData).subscribe({
      next: (response) => {
        console.log('Party created successfully:', response);
        this.partyForm.reset();
        this.selectedDate = undefined;
      },
      error: (error) => {
        console.error('Error creating party:', error);
      },
    });
  }
}
