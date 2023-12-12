import { BaseObject, SimpleLoader, createNode, ListItem } from '../index';
import '../styles/list.scss';

const EMPTY_PANEL_CLASS = 'empty-list';

export default class List extends BaseObject {
  public emptyText!: string | null;

  public data!: Record<string, any>[];

  public itemObject!: InstanceType<typeof ListItem>;

  private loader: HTMLElement | null = null;

  constructor(args: Record<string, any>) {
    super();
    Object.assign(this, args);
    this.el = createNode(`<div class="tswui-list"></div>`);
  }

  render(): void {
    const target = this.elAlias || this.el;
    this.clearList();
    this.data.forEach((record: Record<string, any>) => {
      try {
        // @ts-ignore TODO: How do we express that this.itemObject is a ListItem instance?
        const listItem = new this.itemObject(record);
        listItem.parent = this;

        const node = listItem.el;

        node.tswuiO = listItem;
        target.appendChild(node);
      } catch (error) {
        console.warn(error, record);
      }
    });

    // Handle Empty Text
    if (target.hasChildNodes() === false) {
      target.appendChild(this.emptyListMessageNode());
    }
  }

  emptyListMessageNode(): HTMLElement {
    return createNode(`<div class="empty-list">${this.emptyText}</div>`);
  }

  preRender(): void {
    const target = this.elAlias || this.el;
    target.innerHTML = '';
    this.loader = this.loader || (new SimpleLoader(48).element as HTMLElement);
    target.classList.add(EMPTY_PANEL_CLASS);
    target.appendChild(this.loader);
  }

  clearList(): void {
    const target = this.elAlias || this.el;

    this.empty();
    target.innerHTML = '';
    target.classList.remove(EMPTY_PANEL_CLASS);
  }
}
