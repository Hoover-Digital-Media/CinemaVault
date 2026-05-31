import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'info' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly toast = signal<Toast | null>(null);

  show(message: string, type: Toast['type'] = 'info', duration = 3000): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set({ message, type });
    this.timer = setTimeout(() => this.toast.set(null), duration);
  }

  dismiss(): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(null);
  }
}
