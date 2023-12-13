import InputMask from './input-mask';

export default class Phone extends InputMask {
  public countryCode!: number;

  constructor(args?: { [key: string]: unknown }) {
    super({
      countryCode: '1',
      ...args,
    });

    const countryCodeItem = document.createElement('div');
    countryCodeItem.classList.add('country-code');
    countryCodeItem.innerHTML = '+' + this.countryCode;

    this.container.classList.add('form-phone');
    this.container.appendChild(countryCodeItem);

    // Input masking
    this.field.setAttribute('data-format', '(***) ***-****');
    this.field.setAttribute('data-mask', '(   )    -    ');
    this.setMaskListeners();
  }

  validationFn(val: string | null) {
    const value = val || this.getValue();

    if (value && /^\+?[1-9]\d{10}$/.test(value)) {
      return true;
    } else if (this.required === true || (value && value.length > 0)) {
      throw new Error((this.label ? this.label : this.name) + ' does not contain a valid US phone number.');
    }
  }

  getValue(): string | null {
    const fieldVal = this.field.value.trim();
    let returnVal: string | null = fieldVal.length > 0 ? fieldVal : null;

    this.value = returnVal;

    if (returnVal !== null) {
      returnVal = returnVal.replace(/\D/g, '');
      returnVal = '+' + this.countryCode + returnVal;
    }

    return returnVal;
  }

  setValue(val: string | null): void {
    const removeCCRegex = new RegExp('^\\+' + this.countryCode);
    const setValue = val !== null && val !== undefined && typeof val.trim === 'function' ? val.trim() : val;

    this.value =
      setValue !== null && setValue !== undefined && !isNaN(Number(setValue)) && String(setValue).length > 0
        ? setValue
        : null;
    this.field.value = this.value;

    if (this.value) {
      this.field.value = String(this.value).replace(removeCCRegex, '');
      this.format();
    }
  }
}
