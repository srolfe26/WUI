import InputMask from './input-mask';

export default class SimpleDate extends InputMask {
  constructor(args: any) {
    super({
      'data-format': '**-**-****',
      'data-mask': '**-**-****',
      ...args,
    });

    this.setMaskListeners();
  }

  getValue(): string | null {
    const fieldVal = this.field.value.trim();
    const returnVal: string | null = fieldVal.length > 0 ? fieldVal : null;

    this.value = returnVal;

    return returnVal;
  }
}
