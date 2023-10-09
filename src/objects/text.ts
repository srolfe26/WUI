import { isset, FormItem, createNode } from '../index';

interface Args extends Record<string, unknown> {
    name: string;
    label?: string;
    autocomplete?: string | boolean;
    disabled?: boolean;
}

export default class Text extends FormItem {
    autocomplete!: string | boolean;

    el: HTMLElement;

    container: Element | null;

    field: HTMLInputElement;

    constructor(args: Args) {
        super({
            autocomplete: 'auto',
            ...args
        });
        this.el = this.element;
        this.container = this.el.querySelector('.field-wrapper');
        this.field = this.el.querySelector('.form-input[type="text"]') as HTMLInputElement;
    }

    get element(): HTMLElement {
        return createNode(`
      <div class="form-item">
          ${this.label
                ? `<label class="form-label" ${this.forAttr}>${this.label}</label>`
                : ''
            }
          <div class="field-wrapper">
              <input type="text" class="form-input primary-color"
              name="${this.autocomplete === false
                ? `no_auto_${20000 + Math.floor(Math.random() * 100000)}`
                : this.name
            }"
              ${this.idAttr}
              ${this.autocomplete === false ? ' autocomplete="off" ' : ''}
              ${this.disabled === true ? ' disabled="true" ' : ''}>
          </div>
      </div>
    `) as HTMLElement;
    }

    getValue(): string | null {
        const fieldVal = this.field.value.trim();
        this.value = fieldVal.length > 0 ? fieldVal : null;

        return this.value as string | null;
    }

    setValue(val: string): void {
        const setValue = isset(val) && typeof val.trim === 'function' ? val.trim() : val;

        this.value = isset(setValue) && String(setValue).length > 0 ? setValue : null;
        this.field.value = this.value as string;
    }

    clear(): void {
        this.setValue('');
    }

    enable(): void {
        this.disabled = false;
        this.field.disabled = false;
        this.field.tabIndex = 0;
        this.el.classList.remove('form-disabled');
    }

    disable(): void {
        this.disabled = true;
        this.field.disabled = true;
        this.field.tabIndex = -1;
        this.el.classList.add('form-disabled');
    }
}