import createNode from '../utils/createNode';
import FormItem from './form-item';

const DROP_DOWN_ICON =
  '<svg class="show-when-closed" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>';
const CLOSE_ICON =
  '<svg class="show-when-open" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>';

export default class Combo extends FormItem {
  constructor(args?: Record<string, unknown>) {
    super(args as Record<string, unknown>);
    Object.assign(this, {
      el: this.element,
      ...args,
    });
  }

  get element() {
    return createNode(`
      <div class="form-item tswui-combo">
        ${this.label ? `<label class="form-label" ${this.forAttr}>${this.label}</label>` : ''}
        <div class="field-wrapper">
          <input type="hidden" name="${this.name}">
          <input name="${
            this.ensureName
          }" class="form-input primary-color" type="text" autocomplete="off" autocorrect="off"
          autocapitalize="off" spellcheck="false" placeholder="" ${this.disabled ? 'disabled' : ''} >
          <button unselectable="on" tabindex="-1" class="field-button dd-switch">
            ${DROP_DOWN_ICON}
            ${CLOSE_ICON}
          </button>
        </div>
      </div>
    `);
  }

  private ensureName() {
    return (this.name || 'combo') + (20000 + Math.floor(Math.random() * 100000));
  }
}
