import createNode from '../utils/createNode';
import SimpleLoader from './simple-loader';
import BaseObject from './base-object';
import '../styles/button.scss';

const HAS_LOADER_CLASS = 'has-loader';
const HIDE_WITH_LOADER_CLASS = 'hide-with-loader';

export default class Button extends BaseObject {
  el: HTMLButtonElement;

  loader: HTMLElement | null = null;

  disabled = false;

  onAsync: ((button: Button) => Promise<void>) | null = null;

  onClick: (() => void) | null = null;

  icon: string | null = null;

  tabIndex: string | null = null;

  cssClass: string | null = null;

  label: string | null = null;

  text: string | null = null;

  constructor(args: object = {}) {
    super();
    Object.assign(this, args);
    this.el = this.element;
    this.bindClickListener();

    if (this.disabled === true) {
      this.disable();
    }
  }

  static get HAS_LOADER_CLASS() {
    return HAS_LOADER_CLASS;
  }

  static get HIDE_WITH_LOADER_CLASS() {
    return HIDE_WITH_LOADER_CLASS;
  }

  bindClickListener() {
    if (typeof this.onAsync === 'function') {
      this.el.addEventListener('click', (event) => {
        event.stopPropagation();
        this.appendLoader();
        (this.onAsync as (button: Button) => Promise<void>)(this).finally(this.removeLoader.bind(this));
      });
    } else if (typeof this.onClick === 'function') {
      this.el.addEventListener('click', (event) => {
        event.stopPropagation();
        (this.onClick as () => void)();
      });
    }
  }

  appendLoader() {
    this.loader = this.loader || (new SimpleLoader(24).element as HTMLElement);
    this.el.appendChild(this.loader);
    this.el.classList.add(HAS_LOADER_CLASS);
    this.disable();
  }

  removeLoader() {
    this.loader?.parentElement?.removeChild(this.loader);
    this.el.classList.remove(HAS_LOADER_CLASS);
    this.enable();
  }

  enable() {
    this.disabled = false;
    this.el.disabled = false;
  }

  disable() {
    this.disabled = true;
    this.el.disabled = true;
  }

  get html() {
    const buttonTextHtml = this.icon
      ? `<span class="tswui-button-icon">${this.icon}</span><span class="tswui-button-text">${this.text || ''}</span>`
      : `${this.text}`;

    return `
      <button
        ${this.ariaLabel}
        class="tswui-button ${this.cssClass || ''}"
        tabindex="${this.tabIndex || 0}"
        unselectable="on"
      >
        ${buttonTextHtml}
      </button>
    `.trim();
  }

  get element() {
    const node = createNode(this.html);
    node.tswuiO = this;

    return node as HTMLButtonElement;
  }

  get ariaLabel() {
    if (this.label) {
      return `aria-label="${this.label}" title="${this.label}"`;
    } else {
      return '';
    }
  }
}
