// @ts-ignore Verge is an older library without typescript support
import verge from 'verge';
import createNode from '../utils/createNode';
import FormItem from './form-item';
import '../styles/combo.scss';
import getscrollbarwidth from '../utils/getscrollbarwidth';
import positionChild from '../utils/position-child';
import BaseObject from './base-object';

const DROP_DOWN_ICON =
  '<svg class="show-when-closed" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>';
const CLOSE_ICON =
  '<svg class="show-when-open" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>';
const SELECTED_CLASS = 'tswui-combo-selected';
const DISABLED_CLASS = 'tswui-combo-disabled';
const COMBO_CHANGE_EVENT = 'combo-change';

type ComboRecord = Record<string, unknown>;
type ComboObject = BaseObject & { record: ComboRecord };

const isVisible = (el: HTMLElement): boolean => {
  return el.offsetParent !== null;
};

export default class Combo extends FormItem {
  public open!: boolean;

  public valueItem!: string;

  public titleItem!: string;

  public subtemplate!: (record: ComboRecord) => BaseObject;

  public dropDownCssClasses!: string[];

  public field: HTMLElement;

  public input: HTMLInputElement;

  public dropDownToggle: HTMLElement;

  public dropDown!: HTMLElement;

  public data!: ComboRecord[];

  public selected!: ComboObject[];

  private justOpened!: boolean;

  private canSearch!: boolean;

  private isBlurring!: boolean | undefined;

  private searchLocal!: boolean;

  private searchThreshold!: number;

  constructor(args?: ComboRecord) {
    super(args as ComboRecord);
    Object.assign(this, {
      el: this.element,
      open: false,
      dropDownCssClasses: [],
      titleItem: null,
      valueItem: null,
      selected: [],
      searchLocal: true,
      searchThreshold: 3,
      subtemplate: (record: ComboRecord): BaseObject =>
        new BaseObject({
          record,
          el: createNode(`<li class="combo-item">${record[this.titleItem]}</li>`),
        }),
      ...args,
    });

    if (this.titleItem === null || this.valueItem === null) {
      this.throw("Combo requires a 'titleItem' and 'valueItem' attributes.");
    }

    // DOM elements
    this.el = this.element;
    this.field = this.el.querySelector('.form-input[type="hidden"]') as HTMLElement;
    this.input = this.el.querySelector('.form-input[type="text"]') as HTMLInputElement;
    this.dropDownToggle = this.el.querySelector('.dd-switch') as HTMLElement;
    this.elAlias = this.dropDown = this.createDropDown();

    // Event Listeners
    this.addEventListeners();
    this.addKeyboardListeners();

    // Render a static dataset
    this.refreshData();
  }

  static get COMBO_CHANGE_EVENT() {
    return COMBO_CHANGE_EVENT;
  }

  get element() {
    return createNode(`
      <div class="form-item tswui-combo">
        ${this.label ? `<label class="form-label" ${this.forAttr}>${this.label}</label>` : ''}
        <div class="field-wrapper">
          <input type="hidden" name="${this.name}">
          <input name="${
            this.ensureName
          }" class="form-input primary-color" type="text" autocomplete="off" autocorrect="off"
          autocapitalize="off" spellcheck="false" placeholder="" ${this.disabled ? 'disabled' : ''} >
          <button unselectable="on" tabindex="-1" class="field-button dd-switch">
            ${DROP_DOWN_ICON}
            ${CLOSE_ICON}
          </button>
        </div>
      </div>
    `);
  }

  private ensureName() {
    return (this.name || 'combo') + (20000 + Math.floor(Math.random() * 100000));
  }

  private createDropDown(): HTMLElement {
    const node = createNode(`<ul class="tswui-combo-dropdown visually-hidden"></ul>`);

    node.classList.add(...this.dropDownCssClasses);
    document.body.appendChild(node);

    return node;
  }

  private addEventListeners(): void {
    // Prevent the field from losing focus if a user clicks on disabled items in the list
    this.dropDown.addEventListener('touchend', () => this.input.focus());
    this.dropDown.addEventListener('click', () => this.input.focus());

    this.dropDownToggle.addEventListener('touchstart', this.blurHandler.bind(this));
    this.dropDownToggle.addEventListener('mousedown', this.blurHandler.bind(this));
    this.dropDownToggle.addEventListener('touchend', this.toggleHandler.bind(this));
    this.dropDownToggle.addEventListener('click', this.toggleHandler.bind(this));

    // Toggle opening and closing the dropdown
    this.input.addEventListener('touchstart', this.openDropDown.bind(this));
    this.input.addEventListener('mousedown', this.openDropDown.bind(this));
  }

  private toggleDropdownEvents(): void {
    const dropDownEventFn = this.open ? this.dropDown.addEventListener : this.dropDown.removeEventListener;
    const childFnString = this.open ? 'addEventListener' : 'removeEventListener';

    dropDownEventFn('touchstart', this.notBlurringHandler.bind(this));
    dropDownEventFn('mousedown', this.notBlurringHandler.bind(this));

    this.dropDown.childNodes.forEach((child) => {
      child[childFnString]('touchstart', this.notBlurringHandler.bind(this));
      child[childFnString]('mousedown', this.notBlurringHandler.bind(this));
      child[childFnString]('touchend', this.selectHandler.bind(this));
      child[childFnString]('click', this.selectHandler.bind(this));
    });
  }

  private notBlurringHandler(event: Event): void {
    event.stopPropagation();
    this.isBlurring = false;
  }

  private blurHandler(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (document.activeElement === this.field) {
      this.notBlurringHandler(event);
    }
  }

  private selectHandler(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (event.target instanceof HTMLElement) {
      if (!event.target.classList.contains(DISABLED_CLASS)) {
        this.selectElement(event.target);
        this.set();
        this.closeDropDown();
      }
    }
  }

  private selectElement(element: HTMLElement): void {
    if (this.selected[0] && this.selected[0].el === element) {
      return;
    }

    const selector = `.${SELECTED_CLASS}`;
    if (this.dropDown.querySelector(selector)) {
      (this.dropDown.querySelector(selector) as Element).classList.remove(SELECTED_CLASS);
    }

    if (element) {
      element.classList.add(SELECTED_CLASS);
      this.selected = [element.tswuiO as ComboObject];
    } else {
      this.selected = [];
    }
  }

  private getRecordItem(item: unknown, key: string): string {
    if (item instanceof HTMLElement) {
      return (item.tswuiO as ComboObject).record[key] as string;
    } else if (item instanceof BaseObject) {
      return (item as ComboObject).record[key] as string;
    } else if (item instanceof Object) {
      return (item as ComboRecord)[key] as string;
    } else {
      return item as string;
    }
  }

  private getValueItem(item: unknown): string {
    return this.getRecordItem(item, this.valueItem);
  }

  private getTitleItem(item: unknown): string {
    return this.getRecordItem(item, this.titleItem);
  }

  set(): void {
    const selection = this.selected[0];

    if (selection) {
      const { record } = selection;

      // Avoid an infinite loop by checking if the value is different
      if (this.value !== record) {
        this.setValue(record);
      }

      // Set the field to the value
      if (record.disabled !== true) {
        this.setFieldValue(this.getTitleItem(record));
        // this.toggleFieldSearchability();
      }
    } else {
      this.setFieldValue('');
    }

    if (this.open === true) {
      this.closeDropDown();
    }
  }

  getValue() {
    return this.getValueItem(this.value);
  }

  public setValue(sv: unknown) {
    const item = this.getItemByKey(this.valueItem, this.getValueItem(sv));
    const dispatchChange = (value: unknown) => {
      const event = new CustomEvent(COMBO_CHANGE_EVENT, {
        bubbles: true,
        detail: { value },
      });
      this.input.dispatchEvent(event);
    };

    this.selectElement(item?.el as HTMLElement);

    if (item instanceof BaseObject && this.value !== item.record) {
      this.value = item.record;
      dispatchChange(this.value);
      this.set();
      return item;
    } else if (item === undefined) {
      this.value = undefined;
      dispatchChange(undefined);
      this.set();
      return undefined;
    }
  }

  private getItemByKey(key: string, searchVal: unknown): ComboObject | undefined {
    let retVal;
    let i = 0;

    if (!Array.isArray(this.items)) {
      return undefined;
    }

    for (i; i < this.items.length; i++) {
      const item = this.items[i] as ComboObject;
      if (
        (item.record[key] !== undefined && item.record[key] === searchVal) ||
        (!isNaN(parseFloat(searchVal as string)) &&
          parseFloat(searchVal as string) === parseFloat(item.record[key] as string))
      ) {
        retVal = item;
        break;
      }
    }

    return retVal;
  }

  private setFieldValue(text: string): void {
    text.trim();
    this.input.value = text;

    if (text.length > 0) {
      this.input.setAttribute('title', text);
    } else {
      this.input.removeAttribute('title');
    }
  }

  private toggleHandler(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.open === true) {
      this.closeDropDown();
    } else {
      const e = new Event('mousedown', { bubbles: true, cancelable: false });

      if (this.input.dispatchEvent) {
        this.input.dispatchEvent(e);
      } else {
        document.dispatchEvent(e);
      }
    }
  }

  public openDropDown(e?: Event): void {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.open = true;
    this.el.classList.add('combo-open');
    this.sizeAndPositionDropDown();
    this.toggleDropdownEvents();
    this.input.focus();
    this.input.select();

    // Close the drop down when the field loses focus.
    document.body.addEventListener('mousedown', this.closeDropDown.bind(this), { once: true });
    document.body.addEventListener('touchstart', this.closeDropDown.bind(this), { once: true });
  }

  public closeDropDown(): void {
    this.open = false;
    this.dropDown.classList.add('visually-hidden');
    this.el.classList.remove('combo-open');
    this.toggleDropdownEvents();
  }

  sizeAndPositionDropDown(): void {
    this.dropDown.classList[this.open ? 'remove' : 'add']('visually-hidden');

    let width: number;
    let widestChild = 0;

    const getComputedWidth = (el: HTMLElement) => {
      return parseInt(window.getComputedStyle(el).width, 10);
    };

    this.dropDown.style.width = '';
    width = getComputedWidth(this.input) < 100 ? 100 : getComputedWidth(this.input);
    widestChild = this.dropDown.offsetWidth + getscrollbarwidth();
    width =
      width > widestChild || widestChild + this.input.getBoundingClientRect().left > verge.viewportW()
        ? width
        : widestChild;
    this.dropDown.style.width = width + 'px';

    positionChild(this.input, this.dropDown);
  }

  public render(): void {
    this.empty();
    this.data.forEach((record: ComboRecord) => {
      try {
        const wuiObj = this.subtemplate(record);
        wuiObj.el.tswuiO = wuiObj;
        this.push(wuiObj);
      } catch (error) {
        console.warn(error, record);
      }
    });
  }

  public refreshData(searchParams?: ComboRecord): void {
    this.render();
  }

  private addKeyboardListeners(): void {
    this.input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.canSearch = false;

        if (this.open) {
          event.stopPropagation();
          event.preventDefault();
          this.set();
        }
      } else {
        event.stopPropagation();
      }

      if (this.items.length < this.searchThreshold && this.searchLocal && event.key !== 'Tab') {
        event.preventDefault();
      }

      if (event.key === 'Tab') {
        if (!this.open) {
          this.set();
        }
      } else {
        if (!['Enter', 'Shift'].includes(event.key)) {
          if (!this.open) {
            this.justOpened = true;
          }
          this.openDropDown();
        }

        if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
          event.preventDefault();
          this.canSearch = false;

          switch (event.key) {
            case 'ArrowDown':
              this.selectAdjacent(1);
              break;
            case 'ArrowUp':
              this.selectAdjacent(-1);
              break;
            case 'Escape':
              this.setValue(this.value);
              this.closeDropDown();
              break;
          }
        } else {
          this.canSearch = true;
        }
      }
    });

    this.input.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (this.open) {
          event.stopPropagation();
          event.preventDefault();
          this.set();
        }
      } else {
        event.stopPropagation();
      }

      // const key = null;
      // if (this.canSearch && !['Tab', 'Shift'].includes(event.key)) {
      //   if (!this.searchLocal) {
      //     this.searchData();
      //   } else {
      //     if (event.key !== undefined && !event.ctrlKey && !event.metaKey && !event.altKey) {
      //       key = event.key;

      //       if (!this._selectTypeBuffer) {
      //         this._selectTypeBuffer = key;

      //         setTimeout(() => {
      //           this._selectTypeBuffer = undefined;
      //         }, 1000);
      //       } else {
      //         this._selectTypeBuffer += key;
      //       }

      //       this.searchHTMLText(this._selectTypeBuffer, (itm) => {
      //         this.selectByEl(itm);
      //       });
      //     }
      //   }
      // }
    });

    this.input.addEventListener('focus', (event: FocusEvent) => {
      event.stopPropagation();

      if (this.isBlurring !== true) {
        this.isBlurring = undefined;
      }
    });

    this.input.addEventListener('blur', () => {
      if (this.isBlurring !== false) {
        this.closeDropDown();
        this.isBlurring = undefined;
      }
    });
  }

  selectAdjacent(dir: number) {
    const options = (this.items as ComboObject[]).filter((item) => isVisible(item.el)).map((item) => item.el);
    const selectedIndex: number = options.findIndex((option) => option === this.selected[0]?.el);
    const theEnd = dir > 0 ? 0 : options.length - 1;

    // If the drop-down was just opened, show the selected item, don't change it.
    if (this.justOpened === true) {
      dir = 0;
      this.justOpened = false;
    }

    const el = selectedIndex !== -1 ? options[selectedIndex + dir] : options[theEnd];
    this.selectElement(el);
  }
}
