import BaseObject from './base-object';
import SimpleLoader from './simple-loader';
import createNode from '../utils/createNode';
import '../styles/list.scss';
import ListItem from './list-item';

const EMPTY_PANEL_CLASS = 'empty-panel';

interface ListArgs {
  emptyText?: string;
  data?: any[];
  itemObject: ListItem;
}

export default class List extends BaseObject {
  public emptyText!: string;
  public data: Array<Object> = [];
  private itemObject: any;
  private loader: HTMLElement | null = null;

  constructor(args: ListArgs) {
    super(args);
    this.itemObject = args.itemObject;
    this.el = createNode(`<div class="tswui-list"></div>`);
  }

  render(): void {
    this.clearList();
    this.data.forEach((record: Object) => {
      try {
        const listItem = new this.itemObject(record);
        listItem.parent = this;

        this.el.appendChild(listItem.el);
      } catch (error) {
        console.warn(error, record);
      }
    });

    // Handle Empty Text
    if (this.el.hasChildNodes() === false) {
      this.el.appendChild(this.emptyListMessageNode());
    }
  }

  emptyListMessageNode(): HTMLElement {
    return createNode(`<div class="empty-list">${this.emptyText}</div>`);
  }

  preRender(): void {
    this.el.innerHTML = '';
    this.loader = this.loader || new SimpleLoader(48).element as HTMLElement;
    this.el.classList.add(EMPTY_PANEL_CLASS);
    this.el.appendChild(this.loader);
  }

  clearList(): void {
    this.empty();
    this.el.innerHTML = '';
    this.el.classList.remove(EMPTY_PANEL_CLASS);
  }
}
