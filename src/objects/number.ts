import Text from './text';

export default class NumberField extends Text {
  public integersOnly!: boolean;

  constructor(args: any) {
    super({
      integersOnly: false,
      ...args,
    });
    this.field.setAttribute('inputmode', 'numeric');
  }

  private _parseNum(num: string | null): number {
    const parseBy = this.integersOnly ? parseInt : parseFloat;
    return parseBy(String(num));
  }

  public override getValue(): any {
    this.value = super.getValue();
    return isNaN(this.value) ? null : this.value;
  }

  public setValue(val: string): void {
    const setValue = this._parseNum(val);
    this.value = isNaN(setValue) ? null : setValue;
    this.field.value = this.value;
  }
}
