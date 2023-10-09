import { isset, BaseObject } from '../index';

class FormItemError extends Error {
    formItem: FormItem;

    formItemError = true;

    constructor(message: string, formItem: FormItem) {
        super(message);
        this.formItem = formItem;
    }
}

export default class FormItem extends BaseObject {
    name!: string | null;

    value: any | null;

    disabled!: boolean;

    invalidMessage!: string | null;

    label!: string | null;

    labelClass!: string | null;

    required!: boolean;

    validationRegex!: RegExp | null;

    id: string | undefined;

    constructor(args: Record<string, any>) {
        super({
            name: null,
            disabled: false,
            invalidMessage: null,
            label: null,
            labelClass: null,
            required: false,
            validationRegex: null,
            ...args
        });
    }

    get idAttr(): string {
        return this._idDependentAttr('id');
    }

    get forAttr(): string {
        return this._idDependentAttr('for');
    }

    private _idDependentAttr(attr: string): string {
        return isset(this.id) ? ` ${attr}="${this.id}"` : '';
    }

    getValue(): any | null {
        return this.value;
    }

    setValue(val: any): void {
        this.value = val;
    }

    get parentCanRemoveMe(): boolean {
        return Boolean(this.parent && this.parent instanceof BaseObject);
    }

    validationFn(val: any): boolean {
        const value = val || this.value;
        const fieldname = this.label ? this.label : this.name;

        const throwError = (err: string): never => {
            throw new FormItemError(this.invalidMessage || err, this);
        };

        if (this.validationRegex && !this.validationRegex.test(value)) {
            throwError(`Invalid value for "${fieldname}".`);
        }

        if (value === null && this.required === true) {
            throwError(`A value for "${fieldname}" is required.`);
        }

        return true;
    }

    throw(errorMessage: string): never {
        throw new FormItemError(errorMessage, this);
    }
}