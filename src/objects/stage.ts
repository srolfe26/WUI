import BaseObject from "./base-object";
import createNode from "../utils/createNode";
import "../styles/stage.scss";
import Page from "./page"

export default class Stage extends BaseObject {
    cssClass = "";

    constructor(args: object = {}) {
        super(args);
        const cssClass = this.cssClass || "";

        this.el = createNode(`<div class="tswui-stage ${cssClass}"></div>`);
        this.el.tswuiO = this;
    }

    currentPanel(): Page | null {
        const panels = this.items.filter((item) => item instanceof Page);

        if (panels.length > 0) {
            return panels.at(-1) as Page;
        } else {
            return null;
        }
    }

    showPanel(page: Page, args?: []): Promise<any> {
        this.addPanel(page);
        return page.show(...(args || []));
    }

    addPanel(page: Page): void {
        if (!(page instanceof Page)) {
            this.error("Items passed to showPanel must be of type Page");
        }

        super.push(page);
    }

    hideAllPagesExcept(
        exceptionPanel: Page,
        removePanels: boolean
    ): Promise<Page> {
        return Promise.all(
            this.items
                .filter((item) => item instanceof Page && item !== exceptionPanel)
                .map((item: BaseObject) => {
                    const page = item as Page;

                    if (!page.isHidden()) {
                        return page
                            .hide()
                            .then((subpage: Page) => {
                                if (removePanels) {
                                    subpage.remove();
                                }
                                return Promise.resolve(subpage);
                            });
                    } else if (removePanels) {
                        page.remove();
                    }

                    return Promise.resolve(page);
                })
        ).then(() => this.showPanel(exceptionPanel));
    }
}
