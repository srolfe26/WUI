import { isset, BaseObject } from '../index';

class FormItemError extends Error {
  formItem: FormItem;

  formItemError = true;

  constructor(message: string, formItem: FormItem) {
    super(message);
    this.formItem = formItem;
  }
}

export default class FormItem extends BaseObject {
  name!: string | null;

  value: any | null;

  disabled!: boolean;

  invalidMessage!: string | null;

  label!: string | null;

  labelClass!: string | null;

  required!: boolean;

  validationRegex!: RegExp | null;

  id: string | undefined;

  constructor(args: Record<string, any>) {
    super();

    Object.assign(this, {
      name: null,
      disabled: false,
      invalidMessage: null,
      label: null,
      labelClass: null,
      required: false,
      validationRegex: null,
      ...args,
    });
  }

  public idAttr(opt: string): string {
    return this._idDependentAttr('id', opt);
  }

  public forAttr(opt: string): string {
    return this._idDependentAttr('for', opt);
  }

  public _idDependentAttr(attr: string, opt: any): string {
    if (opt.id) {
      return ` ${attr}="${opt.id}"`;
    } else {
      return '';
    }
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  getValue(): any | null {
    return this.value;
  }

  setValue(val: any): void {
    this.value = val;
  }

  get parentCanRemoveMe(): boolean {
    return Boolean(this.parent && this.parent instanceof BaseObject);
  }

  validationFn(val: any): void {
    const value = val || this.value;
    const fieldname = this.label ? this.label : this.name;

    const throwError = (err: string): never => {
      throw new FormItemError(this.invalidMessage || err, this);
    };

    if (this.validationRegex && !this.validationRegex.test(value)) {
      throwError(`Invalid value for "${fieldname}".`);
    }

    if (value === null && this.required === true) {
      throwError(`A value for "${fieldname}" is required.`);
    }
  }

  throw(errorMessage: string): never {
    throw new FormItemError(errorMessage, this);
  }
}
