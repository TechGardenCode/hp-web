import { Injectable } from '@angular/core';

type Toast = {
  title: string;
  message: string;
};

type ToastOptions = {
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast(
    { title, message }: Partial<Toast>,
    { duration = 5000, type = 'info' }: ToastOptions
  ): void {
    const toastContainer: HTMLElement = this.getToastParent();
    const toastElement = document.createElement('div');
    toastElement.className = `toast toast-${type || 'info'}`;
    toastElement.innerHTML = `
      <p class="text-lg">${title}</p>
      ${message ? `<p>${message}</p>` : ''}
    `;
    toastElement.style.marginTop = '0.5rem';
    toastElement.style.pointerEvents = 'auto';

    toastContainer.appendChild(toastElement);

    setTimeout(() => {
      toastContainer.removeChild(toastElement);
      if (toastContainer.children.length === 0) {
        this.removeToastParent();
      }
    }, duration);
  }

  createToastParent() {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    Object.assign(toastContainer.style, {
      position: 'fixed',
      zIndex: '1000',
      right: '0',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      pointerEvents: 'none',
      padding: '1rem',
    });
    document.body.appendChild(toastContainer);
  }

  getToastParent(): HTMLElement {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      this.createToastParent();
      toastContainer = document.getElementById('toast-container');
    }
    return toastContainer as HTMLElement;
  }

  removeToastParent() {
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
      document.body.removeChild(toastContainer);
    }
  }
}
