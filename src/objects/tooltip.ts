import createNode from '../utils/createNode';
import positionChild from '../utils/position-child';
import BaseObject from './base-object';
import '../styles/tooltip.scss';

interface Args {
  parent: HTMLElement | BaseObject;
  [key: string]: any;
}

export default class Tooltip extends BaseObject {
  cssClass: string | null = null;

  private isOpen = false;

  target: HTMLElement;

  constructor(args: Args) {
    super();

    Object.assign(this, {
      items: [],
      ...args,
    });

    this.el = createNode(`<div class="tswui-tooltip ${this.cssClass || ''}"></div>`) as HTMLElement;
    this.target = (this.parent instanceof BaseObject ? this.parent.el : this.parent) as HTMLElement;
    document.body.appendChild(this.el);
  }

  toggle(): void {
    this[this.isOpen ? 'close' : 'open']();
  }

  open(): void {
    this.isOpen = true;
    this.appendItems();
    this.positionToolTip();
    this.el.classList.add('open');

    // Close the tooltip when the field loses focus.
    document.body.addEventListener('mousedown', this.close.bind(this), { once: true });
    document.body.addEventListener('touchstart', this.close.bind(this), { once: true });
    this.el.addEventListener('mousedown', (e) => this.delayEvent(e));
    this.el.addEventListener('touchstart', (e) => this.delayEvent(e));
  }

  // Necessary to prevent the tooltip from closing immediately when clicking on it.
  delayEvent(event: Event): void {
    event.stopPropagation();
    setTimeout(() => {
      document.body.dispatchEvent(new Event(event.type));
    }, 333);
  }

  close(): void {
    this.isOpen = false;
    this.positionToolTip();
    this.el.classList.remove('open');
  }

  positionToolTip(): void {
    this.el.classList[this.isOpen ? 'remove' : 'add']('visually-hidden');
    positionChild(this.target, this.el, { spacing: 8, centered: true });
  }
}
