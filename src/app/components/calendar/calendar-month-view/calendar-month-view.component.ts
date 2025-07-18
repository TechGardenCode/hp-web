import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonDirective } from '../../button/button.directive';

@Component({
  selector: 'app-calendar-month-view',
  imports: [CommonModule, ButtonDirective],
  templateUrl: './calendar-month-view.component.html',
  styleUrl: './calendar-month-view.component.css',
})
export class CalendarMonthViewComponent implements OnInit {
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  today = new Date();
  datesInMonth: (Date | undefined)[] = [];

  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  @Input() selectedDate?: Date;

  @Output() selectDate = new EventEmitter<Date>();

  ngOnInit(): void {
    this.generateDatesInMonth();
  }

  generateDatesInMonth(): void {
    const startDate = new Date(this.year, this.month, 1);
    const endDate = new Date(this.year, this.month + 1, 0);
    this.datesInMonth = [];

    const day = startDate.getDay();
    // Fill the first week with empty dates if the month does not start on Sunday
    for (let i = 0; i < day; i++) {
      this.datesInMonth.push(undefined);
    }

    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      this.datesInMonth.push(new Date(day));
    }

    // Fill the last week with empty dates if the month does not end on Saturday
    const lastDay = endDate.getDay();
    for (let i = lastDay + 1; i < 7; i++) {
      this.datesInMonth.push(undefined);
    }
  }

  onDateSelect(date?: Date): void {
    if (!date) return;
    this.selectedDate = date;
    this.selectDate.emit(date);
  }

  isToday(date?: Date): boolean {
    if (!date) return false;
    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );
  }

  isSelectedDate(date?: Date): boolean {
    if (!this.selectedDate || !date) return false;
    return (
      this.selectedDate?.getDate() === date.getDate() &&
      this.selectedDate?.getMonth() === date.getMonth() &&
      this.selectedDate?.getFullYear() === date.getFullYear()
    );
  }
}
