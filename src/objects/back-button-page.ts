import { Page, Button, Toolbar, BaseObject, createNode } from '../index';

interface TitleObj extends BaseObject {
    titleContainer: HTMLElement
}

export default class BackButtonPanel extends Page {
    private title = "";

    private backFunction = () => this.hide(Page.HIDE_RIGHT);

    protected toolbar: Toolbar;

    private logoAndTitle: TitleObj;

    constructor(args: any) {
        super(args);
        Object.assign(this, args);

        this.el.classList.add("list-panel");

        this.toolbar = new Toolbar({
            items: [
                new Button({
                    text: `<svg viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg>`,
                    cssClass: Toolbar.TOOLBAR_LEFT,
                    label: "Back",
                    onClick: this.backFunction,
                }),
                (this.logoAndTitle = this.toolbarLogo),
            ],
        });

        this.items = [this.toolbar, ...this.items];
    }

    public get toolbarLogo(): TitleObj {
        const element = createNode(`
        <div class="${Toolbar.TOOLBAR_CENTER}">
            <div class="toolbar-title no-overflow">${this.title || ""}</div>
        </div>
    `);
        return new BaseObject({
            el: element,
            titleContainer: element.querySelector('.toolbar-title')
        }) as TitleObj;
    }

    public show(): Promise<this> {
        this.appendItems();
        return super.show();
    }

    public setTitle(title: string): void {
        this.logoAndTitle.titleContainer.innerHTML = title;
    }
}
