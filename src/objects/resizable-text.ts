import { FormItem, createNode, isset } from '../index';
import '../styles/resizable-text.scss';

interface ResizableTextArgs {
  name?: string;
  label?: string;
  autocomplete?: string;
  cssClass?: string;
  idAttr?: string;
  forAttr?: string;
  [key: string]: unknown;
}

export default class ResizableText extends FormItem {
  private container: HTMLElement;

  private wrapper: HTMLElement;

  private field: HTMLElement;

  public cssClass?: string;

  constructor(args: ResizableTextArgs) {
    super(args);
    Object.assign(this, {
      autocomplete: 'auto',
      ...args,
    });

    this.el = this.element;
    this.container = this.el.querySelector('.field-wrapper') as HTMLElement;
    this.wrapper = this.el.querySelector('.resizable-wrapper') as HTMLElement;
    this.field = this.el.querySelector('.resizable-field') as HTMLElement;
  }

  private get element(): HTMLElement {
    return createNode(`
            <div class="form-item">
                <label class="form-label" ${this.forAttr}>${this.label}</label>
                <div class="field-wrapper">
                    <div class="form-input primary-color resizable-wrapper ${this.cssClass || ''}">
                        <span class="resizable-field" tabindex="0" ${this.idAttr} contenteditable="true"></span>
                    </div>
                </div>
            </div>
        `) as HTMLElement;
  }

  public getValue(): string | null {
    const fieldVal = this.field.innerHTML
      .replace(/<\/?[^>]+?>/gim, '\n') // replace all tags
      .replace(/\n[\s]*\n/gim, '\n') // replace many empty lines to one
      .trim();

    this.value = fieldVal.length > 0 ? fieldVal : null;

    return this.value;
  }

  public setValue(val: string | null): void {
    const setValue = isset(val) && typeof val === 'string' ? val.trim() : val;
    this.value = isset(setValue) && String(setValue).length > 0 ? setValue : null;

    this.field.innerHTML = this.value || '';
  }
}
