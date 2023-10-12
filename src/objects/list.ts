import { BaseObject, SimpleLoader, createNode, ListItem } from '../index';
import '../styles/list.scss';

const EMPTY_PANEL_CLASS = 'empty-panel';

export default class List extends BaseObject {
  public emptyText!: string | null;

  public data!: Array<Record<string, any>>[];

  public itemObject!: InstanceType<typeof ListItem>;

  private loader: HTMLElement | null = null;

  constructor(args: Record<string, any>) {
    super();
    Object.assign(this, args);
    this.el = createNode(`<div class="tswui-list"></div>`);
  }

  render(): void {
    this.clearList();
    this.data.forEach((record: Record<string, any>) => {
      try {
        // @ts-ignore TODO: How do we express that this.itemObject is a ListItem instance?
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
    this.loader = this.loader || (new SimpleLoader(48).element as HTMLElement);
    this.el.classList.add(EMPTY_PANEL_CLASS);
    this.el.appendChild(this.loader);
  }

  clearList(): void {
    this.empty();
    this.el.innerHTML = '';
    this.el.classList.remove(EMPTY_PANEL_CLASS);
  }
}
