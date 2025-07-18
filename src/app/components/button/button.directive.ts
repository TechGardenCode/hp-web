import { booleanAttribute, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appButton]',
  host: {
    class:
      'rounded-full leading-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
  },
})
export class ButtonDirective {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input({ transform: booleanAttribute }) round = false;
  @Input({ transform: booleanAttribute }) inverted = false;
  @Input({ transform: booleanAttribute }) showBorder = true;
  @Input({ transform: booleanAttribute }) readonly = false;

  constructor() {}

  @HostBinding('class')
  get classList(): string {
    const classList = [];
    if (!this.round) {
      switch (this.size) {
        case 'sm':
          classList.push('px-3 py-2 text-sm');
          break;
        case 'md':
          classList.push('px-3 py-3');
          break;
        case 'lg':
          classList.push('px-4 py-3 text-lg');
          break;
      }
    } else {
      switch (this.size) {
        case 'sm':
          classList.push('w-8 h-8');
          break;
        case 'md':
          classList.push('w-16 h-16');
          break;
        case 'lg':
          classList.push('w-24 h-24');
          break;
      }
    }

    if (!this.inverted) {
      classList.push('bg-white text-black hover:bg-neutral-200 active:bg-neutral-100 border-neutral-300');
    } else {
      classList.push('bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 border-neutral-700');
    }

    if (this.showBorder) {
      classList.push('border');
    }

    if (this.readonly) {
      classList.push('pointer-events-none');
    }

    return classList.join(' ');
  }
}
