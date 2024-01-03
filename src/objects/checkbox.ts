import { isset, createNode, FormItem } from '../index';
import '../styles/checkbox.scss';

type CheckOption = {
  label: string;
  value: string | number | null;
};

export default class Checkbox extends FormItem {
  public container!: HTMLElement;

  public cssClass!: string;

  public options!: undefined | CheckOption[];

  constructor(args: any) {
    super(args);
    Object.assign(this, args);

    this.validateAndSetup();
    this.container = this.el.querySelector('.option-container') || this.el;
    this.renderOptions(this.container);
  }

  get inputType(): string {
    return 'checkbox';
  }

  get unselected(): string {
    return `<svg class="checkbox-icon unchecked" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>`;
  }

  get selected(): string {
    return `<svg class="checkbox-icon checked" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>`;
  }

  get multiValueFieldSetNode(): HTMLElement {
    return createNode(`
            <div class="form-checkbox">
                <fieldset class="form-fieldset ${this.cssClass || ''}">
                    <legend class="form-legend">${this.label}</legend>
                    <div class="option-container"></div>
                </fieldset>
            </div>
        `);
  }

  singleValueTemplate(opt: any): HTMLElement {
    return createNode(`
            <div class="field-wrapper">
                <label class="form-label disable-select primary-color" ${this.forAttr(opt)}>
                    <input type="${this.inputType}" ${this.idAttr(opt)} name="${this.name}" value="${opt.value}">
                    <div class="input-container">
                        ${this.unselected}
                        ${this.selected}
                    </div>
                    <div class="text-container">
                        <span class="label-text">${opt.label}</span>
                        <span class="selected-text">${opt.selected_text ? opt.selected_text : ''}</span>
                    </div>
                </label>
            </div>
        `);
  }

  validateAndSetup() {
    const errorMessage = 'A Checkbox must have an array of options (multi-select) or a label defined.';

    if (!this.options && !this.label) {
      throw new Error(errorMessage);
    } else if (this.options) {
      // multi-checkbox item
      this.el = this.multiValueFieldSetNode;
    } else {
      if (!this.label) {
        throw new Error(errorMessage);
      }

      // Single checkbox item where label is defined instead of options
      this.el = createNode(`<div class="form-checkbox"></div>"`);
      this.options = [
        {
          label: this.label,
          value: 1,
        },
      ];
    }
  }

  renderOptions(target: HTMLElement) {
    if (this.options) {
      this.options.forEach((option, index) => {
        const optionElement = this.singleValueTemplate({
          ...option,
          name: this.name,
          id: this.id ? `${this.id}_${index}` : undefined,
        });
        target.appendChild(optionElement);
      });

      this.addOptionListeners();
    } else {
      throw new Error('Options must be defined before they can be rendered in Checkbox.renderOptions().');
    }
  }

  addOptionListeners() {
    this.el.querySelectorAll('input').forEach((input) =>
      input.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const val = target.value || null;
        this.value = val;
      })
    );
  }

  getValue() {
    const values: string[] = [];

    this.el.querySelectorAll<HTMLInputElement>('input:checked').forEach((item: HTMLInputElement) => {
      values.push(item.value);
    });
    this.value = values.length > 0 ? (values.length > 1 ? values : values[0]) : null;

    return this.value;
  }

  setValue(val: string | string[] | null) {
    if (Array.isArray(val) || !isset(val)) {
      this.value = val;
    } else {
      this.value = [val];
    }

    // clear out all checkboxes
    this.el.querySelectorAll('input').forEach((checkbox) => (checkbox.checked = false));

    // If the value is null there's nothing left to check
    if (!isset(this.value)) {
      return;
    }

    // check the values
    if (this.options && this.options.length === 1) {
      const checkbox = this.el.querySelector('input') as HTMLInputElement;
      checkbox.checked = true;
    } else {
      this.value.forEach((valueItem: string | number | null) =>
        this.el.querySelectorAll<HTMLInputElement>(`[value="${valueItem}"]`).forEach((input) => (input.checked = true))
      );
    }
  }

  disable() {
    super.disable();
    this.el.querySelectorAll('input').forEach((input) => (input.disabled = true));
    this.el.classList.add('form-disabled');
  }

  enable() {
    super.enable();
    this.el.querySelectorAll('input').forEach((input) => (input.disabled = false));
    this.el.classList.remove('form-disabled');
  }
}
