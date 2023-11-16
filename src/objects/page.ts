import BaseObject from './base-object';
import createNode from '../utils/createNode';
import '../styles/page.scss';

const HIDE_LEFT = 'page-left';
const HIDE_RIGHT = 'page-right';
const PANEL_CLASS = 'tswui-page';
const ANIMATION_TIME = 334;

export default class Page extends BaseObject {
  private hidden!: boolean;

  constructor(args: object = {}) {
    super();
    Object.assign(this, {
      el: createNode(`<div class="${PANEL_CLASS} ${HIDE_RIGHT}"></div>`),
      hidden: true,
      ...args,
    });
    this.el.tswuiO = this;
  }

  public show(): Promise<this> {
    return new Promise((resolve, reject) => {
      try {
        if (this.el !== null) {
          const panelElement: HTMLElement = this.el;
          setTimeout(() => panelElement.classList.remove(HIDE_LEFT, HIDE_RIGHT), 0);
          setTimeout(() => {
            this.hidden = false;
            resolve(this);
          }, ANIMATION_TIME);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public hide(direction: string = HIDE_RIGHT): Promise<this> {
    return new Promise((resolve, reject) => {
      try {
        if (this.el !== null) {
          const panelElement: HTMLElement = this.el;
          setTimeout(() => {
            panelElement.classList.add(direction);
          }, 0);

          setTimeout(() => {
            this.hidden = true;
            resolve(this);
          }, ANIMATION_TIME);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Specify the return type
  public isHidden(): boolean {
    return this.hidden === true;
  }

  // Specify static members with their return types
  public static readonly HIDE_LEFT: string = HIDE_LEFT;

  public static readonly HIDE_RIGHT: string = HIDE_RIGHT;

  public static readonly PANEL_CLASS: string = PANEL_CLASS;
}
