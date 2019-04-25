import { ActionButton } from './action-button';

export interface AlertOptions {
  alertType?: string;
  title?: string;
  description?: string;
  buttons?: ActionButton[];
}

export interface ToastOptions extends AlertOptions {
  id: string;
  duration: number;
  close: boolean;
}
