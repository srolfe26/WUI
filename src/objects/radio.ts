import Checkbox from './checkbox';

export default class Radio extends Checkbox {
  get inputType(): string {
    return 'radio';
  }

  get unselected(): string {
    return '<svg class="checkbox-icon unchecked" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';
  }

  get selected(): string {
    return '<svg class="checkbox-icon checked" width="24" height="24" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';
  }

  validateAndSetup(): void {
    if (this.options && Array.isArray(this.options)) {
      this.el = this.multiValueFieldSetNode;
    } else {
      throw new Error('A Radio must have an array of options defined.');
    }
  }

  setValue(val: string | null): string | null {
    if (val === null) {
      this.el.querySelectorAll<HTMLInputElement>('input').forEach((radio) => (radio.checked = false));
      this.value = null;
      return this.value;
    }

    this.el.querySelectorAll<HTMLInputElement>(`input[value="${val}"]`).forEach((radio) => {
      radio.checked = true;
      this.value = val;
    });

    return this.value;
  }

  disable(): void {
    this.el.querySelectorAll<HTMLInputElement>('input').forEach((radio) => {
      radio.disabled = true;
    });
  }

  enable(): void {
    this.el.querySelectorAll<HTMLInputElement>('input').forEach((radio) => {
      radio.disabled = false;
    });
  }
}
