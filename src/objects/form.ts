import { isset, BaseObject, createNode } from '../index';
import '../styles/forms.scss';

const VALIDATION_ERROR = 'form_validation_error';
const VALIDATION_CLASS = 'form-validation';
const errorClass = 'form-error';
const errHilightClass = 'bump';
const FORM_CHANGED_EVENT = 'formchanged';

interface FormItem extends BaseObject {
  name: string;
  getValue: () => any;
  setValue?: (value: any) => void;
  validationFn?: (value: any) => void;
}

interface Args {
  el: HTMLFormElement;
  [key: string]: any;
}

/**
 * Base object for all others
 */
export default class Form extends BaseObject {
  // @ts-ignore
  items: FormItem[];

  constructor(args: Args) {
    super();

    Object.assign(this, {
      items: [],
      ...args,
    });

    const handleChange = (event: Event) => {
      for (const item of this.items) {
        if (item.el.contains(event.target as Node)) {
          const customEvent = new CustomEvent(FORM_CHANGED_EVENT, {
            detail: {
              originalEvent: event,
              formField: item,
              value: item.getValue(),
            },
          });

          this.el.dispatchEvent(customEvent);
          break;
        }
      }
    };

    if (!(args.el instanceof HTMLFormElement)) {
      throw new Error('A form requires a form element to be passed in.');
    }

    this.el = args.el;
    this.el.tswuiO = this;

    this.el.onsubmit = (e) => {
      e.preventDefault();
    };

    this.el.addEventListener('change', handleChange);
    this.el.addEventListener('combochange', handleChange);
  }

  static get FORM_CHANGED_EVENT() {
    return FORM_CHANGED_EVENT;
  }

  static get VALIDATION_ERROR() {
    return VALIDATION_ERROR;
  }

  itemByName(name: string): FormItem | undefined {
    return this.items.find((item) => item.name === name);
  }

  itemByType(type: any): FormItem | undefined {
    return this.items.find((item) => item instanceof type);
  }

  hasData(): boolean {
    const rawData = this.getRawData();
    return Object.values(rawData).some((item) => isset(item));
  }

  getRawData(): Record<string, any> {
    const data: Record<string, any> = {};

    this.items.forEach((item) => {
      if (typeof item.getValue === 'function') {
        data[item.name] = item.getValue();
      }
    });

    return data;
  }

  getData(): Record<string, any> {
    const data = this.getRawData();
    const errors = this.validateData(data);

    this.clearValidation();
    if (errors.length > 0) {
      this.showValidation(errors);
      throw new Error(VALIDATION_ERROR);
    }

    return data;
  }

  validateData(data: Record<string, any>): { field: FormItem; message: string }[] {
    const errors: { field: FormItem; message: string }[] = [];

    this.items.forEach((item) => {
      try {
        item.validationFn?.(data[item.name]);
      } catch (e: any) {
        errors.push({
          field: item,
          message: e.message,
        });
      }
    });

    return errors;
  }

  setData(data: Record<string, any>): void {
    this.items.forEach((item) => {
      if (typeof item.setValue === 'function') {
        const setVal = isset(data[item.name]) ? data[item.name] : null;
        item.setValue(setVal);
      }
    });
  }

  clearData(): void {
    this.items.forEach((item) => {
      item.setValue?.(null);
    });
  }

  clearValidation(): void {
    const validationElement = this.el.querySelector(`.${VALIDATION_CLASS}`);

    if (validationElement instanceof HTMLElement) {
      this.el.removeChild(validationElement);
    }

    Array.from(this.el.querySelectorAll('.' + errorClass)).forEach((item) => {
      item.classList.remove(errorClass, errHilightClass);
    });
  }

  showValidation(errors: { field: FormItem; message: string }[]): void {
    const newErrorHeader = document.createElement('ul');
    newErrorHeader.classList.add(VALIDATION_CLASS);

    this.el.prepend(newErrorHeader);

    errors.forEach((errorItem) => {
      const errNode = createNode(`<li class="form-error-item">${errorItem.message}</li>`);

      if (errorItem.field) {
        errNode.addEventListener('click', () => {
          errorItem.field.el.scrollIntoView({ behavior: 'smooth' });
          errorItem.field.el.classList.add(errHilightClass);
        });

        errorItem.field.el.classList.add(errorClass);
      }

      newErrorHeader.appendChild(errNode);
    });
  }
}
