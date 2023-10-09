import { ListItem, createNode } from '../src/index';

interface MenuItem {
  icon?: string;
  title?: string;
  eventHandler?: (item: PlainListItem, event: Event) => void;
}

declare interface PlainListItemHTMLElement extends HTMLElement {
  obj: PlainListItem;
}

export default class PlainListItem extends ListItem {
  data: MenuItem;

  constructor(record: MenuItem) {
    super(record);
    this.data = record;
  }

  get html(): string {
    const record: MenuItem = this.data as MenuItem;
    return `
        <div class="list-item">
            <h3 class="no-overflow">${record.icon || ""} ${record.title}</h3>
        </div>
    `;
  }

  get el(): HTMLElement {
    const el: PlainListItemHTMLElement = createNode(this.html) as PlainListItemHTMLElement;

    el.obj = this;

    el.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();
      if (this.data.eventHandler) {
          this.data.eventHandler(this, event);
      }
    });

    return el;
  }
}
