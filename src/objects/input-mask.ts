import NumberField from './number';

export default class InputMask extends NumberField {
  constructor(args: any) {
    args.integersOnly = true;
    super(args);
  }

  private doFormat(x: string, pattern: string, mask?: string) {
    const strippedValue = x.replace(/[^0-9]/g, '');
    const chars = strippedValue.split('');
    let count = 0;
    let c;
    let formatted = '';

    for (let i = 0; i < pattern.length; i++) {
      c = pattern[i];
      if (chars[count]) {
        if (/\*/.test(c)) {
          formatted += chars[count];
          count++;
        } else {
          formatted += c;
        }
      } else if (mask) {
        if (mask.split('')[i]) formatted += mask.split('')[i];
      }
    }

    return formatted;
  }

  format() {
    const elem = this.field as HTMLInputElement;
    const val = this.doFormat(elem.value, elem.getAttribute('data-format') as string);

    elem.value = this.doFormat(
      elem.value,
      elem.getAttribute('data-format') as string,
      elem.getAttribute('data-mask') as string
    );

    if (elem.selectionStart !== undefined) {
      elem.setSelectionRange(val.length, val.length);
    }
  }

  setMaskListeners() {
    this.field.addEventListener('keyup', () => {
      this.format();
    });
    this.field.addEventListener('change', () => {
      this.format();
    });
  }
}
