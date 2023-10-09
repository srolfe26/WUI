import { Text, createNode } from '../index';

interface Args extends Record<string, unknown> {
    name: string;
    label?: string;
    disabled?: boolean;
}

export default class TextArea extends Text {
    // @ts-ignore
    field: HTMLTextAreaElement;

    constructor(args: Args) {
        super(args);
        this.field = this.el.querySelector('textarea.form-input') as HTMLTextAreaElement;
    }

    get element(): HTMLElement {
        return createNode(`
            <div class="form-item">
                <label class="form-label" ${this.forAttr}>${this.label}</label>
                <div class="field-wrapper">
                    <textarea class="form-input primary-color" name="${this.name}" ${this.idAttr}></textarea>
                </div>
            </div>
        `) as HTMLElement;
    }
}
