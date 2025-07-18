import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CalendarMonthViewComponent } from '../../../../components/calendar/calendar-month-view/calendar-month-view.component';
import { ButtonDirective } from '../../../../components/button/button.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create-date-time-picker',
  imports: [CalendarMonthViewComponent, ButtonDirective, CommonModule],
  templateUrl: './event-create-date-time-picker.component.html',
  styleUrl: './event-create-date-time-picker.component.css',
})
export class EventCreateDateTimePickerComponent implements AfterViewInit {
  today = new Date();
  visibleMonths: { month: number; year: number }[] = [];
  visibleTimes: { hour: number; minute: number }[] = [];
  _selectedDate?: Date;
  timePickerScrollEvent!: EventListener;

  @Input()
  set startDate(date: Date) {
    for (let i = 0; i < 12; i++) {
      const month = new Date(date.getFullYear(), date.getMonth() + i, 1);
      this.visibleMonths.push({
        month: month.getMonth(),
        year: month.getFullYear(),
      });
    }
  }

  @Input()
  set selectedDate(date: Date | undefined) {
    if (!date) {
      return;
    }
    this.selectDate(date);
  }

  get selectedDate(): Date | undefined {
    return this._selectedDate;
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Date>();

  ngAfterViewInit(): void {}

  getDateFromMonthAndYear(month: number, year: number): Date {
    return new Date(year, month, 1);
  }

  selectDate(date: Date): void {
    this._selectedDate = date;
    this.generateVisibleTimes(date);
  }

  generateVisibleTimes(date: Date): void {
    this.visibleTimes = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (this.isToday(date) && hour < this.today.getHours()) {
          continue;
        }
        if (
          this.isToday(date) &&
          hour === this.today.getHours() &&
          minute < this.today.getMinutes()
        ) {
          continue;
        }
        this.visibleTimes.push({ hour, minute });
      }
    }

    setTimeout(() => {
      if (!this.selectedDate) {
        return;
      }
      const selectedHours = this.selectedDate.getHours();
      const selectedMinutes = this.selectedDate.getMinutes();
      const index = this.visibleTimes.findIndex(
        (time) => time.hour === selectedHours && time.minute === selectedMinutes
      );
      const timePicker = document.getElementById('timePicker');
      if (timePicker) {
        if (index !== -1) {
          timePicker.scrollTop = index * 32 + 5;
        } else {
          timePicker.scrollTop = 0;
        }
      }
    });
  }

  isToday(date: Date): boolean {
    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );
  }

  getTimeZone() {
    return this.today.getTimezoneOffset() / -60;
  }

  onSubmit() {
    const timePicker = document.getElementById('timePicker');
    if (!timePicker) {
      return;
    }
    const scrollTop = timePicker.scrollTop;
    const index = Math.floor((scrollTop - 5) / 32);
    this._selectedDate?.setHours(this.visibleTimes[index].hour);
    this._selectedDate?.setMinutes(this.visibleTimes[index].minute);

    this.submit.emit(this.selectedDate);
  }
}
