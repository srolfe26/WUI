import isset from "../utils/isset";

export default class BaseObject {
    elAlias: HTMLElement | undefined;

    el!: HTMLElement;

    items!: Array<BaseObject>;

    parent: BaseObject | undefined;

    constructor(configs: { [key: string]: any }) {
        Object.assign(this, configs);
    }

    private _isNode(node: any): boolean {
        return isset(node) && node instanceof HTMLElement;
    }
}