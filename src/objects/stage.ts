import BaseObject from './base-object';
import createNode from '../utils/createNode';
import '../styles/stage.scss';
import Page from './page';

export default class Stage extends BaseObject {
  public cssClass!: string;

  constructor(args: object = {}) {
    super();
    Object.assign(this, args);
    const cssClass = this.cssClass || '';

    this.el = createNode(`<div class="tswui-stage ${cssClass}"></div>`);
    this.el.tswuiO = this;
  }

  currentPage(): Page | null {
    const pages = this.items.filter((item) => item instanceof Page);

    if (pages.length > 0) {
      return pages.at(-1) as Page;
    } else {
      return null;
    }
  }

  showPage(page: Page, args?: []): Promise<any> {
    this.addPage(page);
    return page.show(...(args || []));
  }

  addPage(page: Page): void {
    if (!(page instanceof Page)) {
      this.error('Items passed to showPage must be of type Page');
    }

    super.push(page);
  }

  hideAllPagesExcept(exceptionPage: Page, removePages: boolean): Promise<Page> {
    return Promise.all(
      this.items
        .filter((item) => item instanceof Page && item !== exceptionPage)
        .map((item: BaseObject) => {
          const page = item as Page;

          if (!page.isHidden()) {
            return page.hide().then((subpage: Page) => {
              if (removePages) {
                subpage.remove();
              }
              return Promise.resolve(subpage);
            });
          } else if (removePages) {
            page.remove();
          }

          return Promise.resolve(page);
        })
    ).then(() => this.showPage(exceptionPage));
  }
}
