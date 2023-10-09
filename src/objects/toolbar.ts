import BaseObject from "./base-object";
import createNode from "../utils/createNode";
import "../styles/toolbar.scss";

const TOOLBAR_RIGHT = "toolbar-right";
const TOOLBAR_LEFT = "toolbar-left";
const TOOLBAR_CENTER = "toolbar-center";

export default class Toolbar extends BaseObject {
    cssClass!: string | null;

    constructor(args: object = {}) {
        super({ cssClass: null, ...args });
        let timer: ReturnType<typeof setTimeout> | null = null;

        function complete() {
            // this._centerLogo();
            timer = null;
        }

        this.el = createNode(`<div class="tswui-toolbar ${this.cssClass || ""}"></div>`);
        window.addEventListener("resize", function () {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(complete, 35);
        });
    }

    static get TOOLBAR_RIGHT() {
        return TOOLBAR_RIGHT;
    }

    static get TOOLBAR_LEFT() {
        return TOOLBAR_LEFT;
    }

    static get TOOLBAR_CENTER() {
        return TOOLBAR_CENTER;
    }

    appendItems() {
        super.appendItems();
        this._centerLogo();
    }

    _centerLogo() {
        this.el.querySelectorAll(`.${TOOLBAR_CENTER}`).forEach((logoObj: Element) => {
            const centeredObj = logoObj as HTMLElement;
            const toolbarWidth = this.el.offsetWidth;
            const logoWidth = centeredObj.offsetWidth;
            const currentLeft = centeredObj.offsetLeft;
            const centerLeft = toolbarWidth / 2 - logoWidth / 2;
            const adjustLogo = centerLeft - currentLeft;

            centeredObj.style.transform = `translate(${adjustLogo}px, 0)`;
        });
    }
}
