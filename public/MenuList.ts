import { List, Stage, Page } from '../src/index';
import PlainListItem from "./PlainListItem";

const bagSVG =
    '<svg viewBox="0 0 24 24"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
const briefcaseSVG =
    '<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>';

interface App {
    stage: Stage,
    menuPanel: Page
}

export default class MenuList extends List {
    // @ts-ignore
    private app: App;

    constructor(args: object = {}) {
        super({
            // @ts-ignore
            itemObject: PlainListItem,
            emptyText: "No options available.",
            ...args,
        });
    }

    render() {
        this.data = [
            {
                title: "Inventory to List",
                icon: briefcaseSVG,
                eventHandler: () => {
                    console.log('inventory');
                }
            },
            {
                title: "Inventory to Remove",
                icon: bagSVG,
                eventHandler: () => {
                    console.log('remove');
                }
            }
        ];

        super.render();
    }
}
