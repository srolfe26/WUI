import { isset, FormItem } from '../index';

/**
 * Hidden creates a hidden field
 */
export default class Hidden extends FormItem {
  constructor(args: any) {
    super(args);
    Object.assign(this, args);
    this.el = document.createElement('input') as HTMLInputElement;
    this.el.setAttribute('type', 'hidden');
  }

  setValue(args: any) {
    super.setValue(args);
    (this.el as HTMLInputElement).value = isset(this.value) ? this.value.toString() : '';
  }
}
