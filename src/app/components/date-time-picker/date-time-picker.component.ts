import { Component } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { CalendarMonthViewComponent } from "../calendar/calendar-month-view/calendar-month-view.component";

@Component({
  selector: 'app-date-time-picker',
  imports: [DatePickerComponent, TimePickerComponent, CalendarMonthViewComponent],
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.css'
})
export class DateTimePickerComponent {
  month = new Date().getMonth();
  year = new Date().getFullYear();
}
