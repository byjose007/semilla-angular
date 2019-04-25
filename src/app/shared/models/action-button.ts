import { Buttons } from '../constants';

export interface ActionButton {
  id: Buttons;
  text: string;
  icon?: string;
  class?: string;
  disabled?: boolean;
}
