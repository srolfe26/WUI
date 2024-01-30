// @ts-ignore Verge is an older library without typescript support
import verge from 'verge';
import createNode from '../utils/createNode';
import FormItem from './form-item';
import '../styles/combo.scss';
import getscrollbarwidth from '../utils/getscrollbarwidth';
import positionChild from '../utils/position-child';
import BaseObject from './base-object';
import { HIGHLIGHT_STYLE, applyTextHighlight, removeHighlight, SimpleLoader } from '../index';

const DROP_DOWN_ICON =
  '<svg class="show-when-closed" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>';
const CLOSE_ICON =
  '<svg class="show-when-open" focusable="false" aria-hidden="true" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>';
const SEARCH_ICON =
  '<svg class="twsui-combo-search" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>';
const SELECTED_CLASS = 'tswui-combo-selected';
const DISABLED_CLASS = 'tswui-combo-disabled';
const HIDDEN_CLASS = 'visually-hidden';
const COMBO_CHANGE_EVENT = 'combo-change';
const LIST_ITEM_CLASS = 'combo-item';

export type ComboRecord = Record<string, unknown>;
type ComboObject = BaseObject & { record: ComboRecord };

export class Combo extends FormItem {
  public open!: boolean;

  public valueItem!: string;

  public titleItem!: string;

  private subtemplate!: (record: ComboRecord) => BaseObject;

  public dropDownCssClasses!: string[];

  public field: HTMLElement;

  public input: HTMLInputElement;

  public dropDownToggle: HTMLElement;

  public dropDown!: HTMLElement;

  public data!: ComboRecord[];

  public selected!: ComboObject[];

  private justOpened!: boolean;

  private isBlurring!: boolean | undefined;

  private searchLocal!: boolean;

  private searchRemote!: boolean;

  private searchThreshold!: number;

  private keyEventShouldSearch!: boolean | undefined;

  private noResultsMessage: BaseObject | undefined;

  private previous: string | undefined;

  private isSearching!: boolean;

  public searchArgName!: string;

  private mouseEnterListener: number | null = null;

  mouseMoveListenerBound!: boolean;

  constructor(args?: ComboRecord) {
    super(args as ComboRecord);
    Object.assign(this, {
      el: this.element,
      open: false,
      dropDownCssClasses: [],
      titleItem: null,
      valueItem: null,
      // replace this with a remote search parameter
      searchArgName: 'search',
      data: [],
      selected: [],
      searchLocal: true,
      searchRemote: false,
      isSearching: false,
      searchThreshold: 3,
      subtemplate: (record: ComboRecord): BaseObject =>
        new BaseObject({
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

    if (this.searchRemote) {
      this.searchLocal = false;
    } else {
      this.render();
    }
  }

  static get COMBO_CHANGE_EVENT() {
    return COMBO_CHANGE_EVENT;
  }

  get element() {
    return createNode(`
      <div class="form-item tswui-combo${this.searchRemote ? ' combo-remote-search' : ''}">
        ${this.label ? `<label class="form-label" ${this.forAttr}>${this.label}</label>` : ''}
        <div class="field-wrapper">
          <input type="hidden" name="${this.name}">
          <input name="${this.ensureName()}" class="form-input primary-color" type="text" autocomplete="off" autocorrect="off"
          autocapitalize="off" spellcheck="false" placeholder="" ${this.disabled ? 'disabled' : ''} >
          ${
            this.searchRemote
              ? `${SEARCH_ICON}${new SimpleLoader(20).html}`
              : `
          <button unselectable="on" tabindex="-1" class="field-button dd-switch">
            ${DROP_DOWN_ICON}
            ${CLOSE_ICON}
          </button>
          `
          }
        </div>
      </div>
    `);
  }

  private ensureName() {
    return this.name || 'combo' + (20000 + Math.floor(Math.random() * 100000));
  }

  private createDropDown(): HTMLElement {
    const node = createNode(`<ul class="tswui-combo-dropdown visually-hidden"></ul>`);

    node.classList.add(...this.dropDownCssClasses);
    document.body.appendChild(node);

    return node;
  }

  private addEventListeners(): void {
    const blurHandler = this.blurHandler.bind(this);
    const toggleHandler = this.toggleHandler.bind(this);
    const openDropDown = this.openDropDown.bind(this);

    // Prevent the field from losing focus if a user clicks on disabled items in the list
    this.dropDown.addEventListener('touchend', () => this.input.focus());
    this.dropDown.addEventListener('click', () => this.input.focus());

    if (this.dropDownToggle) {
      this.dropDownToggle.addEventListener('touchstart', blurHandler);
      this.dropDownToggle.addEventListener('mousedown', blurHandler);
      this.dropDownToggle.addEventListener('touchend', toggleHandler);
      this.dropDownToggle.addEventListener('click', toggleHandler);
    }

    // Toggle opening and closing the dropdown
    this.input.addEventListener('touchstart', openDropDown);
    this.input.addEventListener('mousedown', openDropDown);
  }

  private killEvent(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private toggleDropdownEvents(): void {
    const notBlurringHandler = this.notBlurringHandler.bind(this);
    const selectHandler = (event: Event): void => {
      this.killEvent(event);
      const listItem = this.findListItem(event.target as HTMLElement);

      if (listItem && !listItem.classList.contains(DISABLED_CLASS)) {
        this.selectElement(listItem);
        this.set();
        this.closeDropDown();
      }
    };
    const dropDownEventFn = this.open ? this.dropDown.addEventListener : this.dropDown.removeEventListener;
    const childFnString = this.open ? 'addEventListener' : 'removeEventListener';

    this.optionListMouseEnter(this.open);
    dropDownEventFn('touchstart', notBlurringHandler);
    dropDownEventFn('mousedown', notBlurringHandler);

    this.dropDown.childNodes.forEach((child) => {
      child[childFnString]('touchstart', notBlurringHandler);
      child[childFnString]('mousedown', notBlurringHandler);
      child[childFnString]('touchend', selectHandler);
      child[childFnString]('click', selectHandler);
    });
  }

  private notBlurringHandler(event: Event): void {
    event.stopPropagation();
    this.isBlurring = false;
  }

  private blurHandler(event: Event): void {
    this.killEvent(event);

    if (document.activeElement === this.field) {
      this.notBlurringHandler(event);
    }
  }

  private optionListMouseEnter(activate: boolean): void {
    const oneTime = () => {
      this.optionListMouseEnter(true);
      this.dropDown.removeEventListener('mousemove', oneTime);
    };

    if (activate) {
      this.mouseEnterListener = window.setTimeout(() => {
        this.addMouseEnterListener();
      }, 300);
    } else {
      if (this.mouseEnterListener) {
        clearInterval(this.mouseEnterListener);
        this.mouseEnterListener = null;
      }

      this.mouseMoveListenerBound = false;
      this.dropDown.removeEventListener('mousemove', this.mouseEnterHandler.bind(this));

      this.dropDown.addEventListener('mousemove', oneTime);
    }
  }

  private mouseEnterHandler = (event: MouseEvent): void => {
    event.stopPropagation();
    const listItem = this.findListItem(event.target as HTMLElement);

    if (listItem) {
      this.selectElement(listItem);

      if (this.mouseEnterListener) {
        clearInterval(this.mouseEnterListener);
        this.mouseEnterListener = null;
      }
    }
  };

  private addMouseEnterListener(): void {
    if (!this.mouseMoveListenerBound) {
      this.mouseMoveListenerBound = true;
      this.dropDown.addEventListener('mousemove', this.mouseEnterHandler);
    }
  }

  private findListItem(element: HTMLElement): HTMLElement | null {
    let currentElement: HTMLElement | null = element;

    while (currentElement && !currentElement.classList.contains(LIST_ITEM_CLASS)) {
      currentElement = currentElement.parentElement;
    }

    return currentElement;
  }

  private selectElement(element: HTMLElement, doScroll = false): void {
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

      if (doScroll) {
        this.scrollToCurrent();
      }
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
      }
    } else {
      this.setFieldValue('');
    }

    if (this.open === true) {
      this.closeDropDown();
    }
  }

  getValue(): string | unknown {
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
    if (!Array.isArray(this.items)) {
      return undefined;
    }

    // @ts-ignore
    return this.items
      .filter((item) => (item as ComboObject).record !== undefined)
      .find((item) => (item as ComboObject).record[key] === searchVal);
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
    this.killEvent(event);

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
      this.killEvent(e);
    }

    if (!this.open && !this.disabled) {
      this.open = true;
      this.el.classList.add('combo-open');
      this.sizeAndPositionDropDown();
      this.resetListHighlighting();
      this.toggleDropdownEvents();
      this.input.focus();
      this.input.select();

      // Close the drop down when the field loses focus.
      document.body.addEventListener('mousedown', this.closeDropDown.bind(this), { once: true });
      document.body.addEventListener('touchstart', this.closeDropDown.bind(this), { once: true });
    }
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

    this.scrollToCurrent();
    positionChild(this.input, this.dropDown);
  }

  scrollToCurrent(): void {
    const firstSelect = this.dropDown.querySelector<HTMLElement>(`.${SELECTED_CLASS}`);
    const ofstP = firstSelect?.offsetParent as HTMLElement | null;
    const dropDownHeight = parseFloat(getComputedStyle(this.dropDown).height.replace('px', ''));
    const offset = (() => {
      let currentNode: ChildNode | null = firstSelect;
      let r = 0;

      while (currentNode) {
        r += (currentNode as HTMLElement).offsetHeight;
        currentNode = currentNode.previousSibling;
      }

      const firstSelectOffsetHeight = firstSelect?.offsetHeight ?? 0;
      r -= dropDownHeight / 2 - firstSelectOffsetHeight / 2;

      return r;
    })();

    if (ofstP) {
      ofstP.scrollTop = offset;
    }
  }

  public render(): void {
    this.empty();

    if (this.data.length === 0) {
      this.addEmptyMessage();
    }

    this.data.forEach((record: ComboRecord) => {
      try {
        const wuiObj = this.subtemplate(record);
        (wuiObj as ComboObject).record = record;
        wuiObj.el.tswuiO = wuiObj;
        wuiObj.el.classList.add(LIST_ITEM_CLASS);
        this.push(wuiObj);
      } catch (error) {
        console.warn(error, record);
      }
    });
  }

  public async refreshData(searchParams?: ComboRecord): Promise<void> {
    // Note: To be overridden in subclasses to fetch data from a remote source.

    if (searchParams) {
      // This line is a no-op to avoid linting errors about unused parameters.
    }
  }

  private addKeyboardListeners(): void {
    let debounceTimer: number;

    const debounceRemoteSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        if (this.keyEventShouldSearch && !this.isSearching) {
          this.doRemoteSearch();
        }
      }, 333);
    };

    this.input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.keyEventShouldSearch = false;

        if (this.open) {
          this.killEvent(event);
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
            this.openDropDown();
            this.justOpened = true;
          }
        }

        if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
          event.preventDefault();
          this.keyEventShouldSearch = false;

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
          this.keyEventShouldSearch = true;
        }
      }
    });

    this.input.addEventListener('keyup', (event: KeyboardEvent) => {
      event.stopPropagation();

      if (event.key === 'Enter') {
        if (this.open) {
          event.preventDefault();
          this.set();
        }
      } else {
        if (this.keyEventShouldSearch && !['Tab', 'Shift'].includes(event.key) && !this.isSearching) {
          this.doLocalSearch();
          debounceRemoteSearch();
        }
      }
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

  private toggleFieldSearchability(currentlySearching: boolean): void {
    this.isSearching = currentlySearching;
    this.el.classList[currentlySearching ? 'add' : 'remove']('tswui-combo-searching');
    this.input.readOnly = currentlySearching;
  }

  selectAdjacent(dir: number) {
    const options = (this.items as ComboObject[])
      .map((item) => item.el)
      .filter((el) => !el.classList.contains(HIDDEN_CLASS));
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

  private doLocalSearch() {
    if (this.searchLocal) {
      const srchVal = this.input.value.trim();
      const searchRegex = new RegExp(srchVal, 'ig');

      if (srchVal !== undefined && srchVal.trim().length !== 0) {
        this.searchHTMLText(
          srchVal,
          (itm) => applyTextHighlight(itm, searchRegex).classList.remove(HIDDEN_CLASS),
          (itm) => removeHighlight(itm).classList.add(HIDDEN_CLASS)
        );
      } else {
        this.resetListHighlighting();
      }

      this.sizeAndPositionDropDown();
    }
  }

  private async doRemoteSearch() {
    if (this.searchRemote) {
      const srchVal = this.input.value.trim();
      const oldSearch = this.previous || undefined;
      this.previous = srchVal;

      if ((srchVal.length >= this.searchThreshold || srchVal.length === 0) && this.previous != oldSearch) {
        this.toggleFieldSearchability(true);
        await this.refreshData({ [this.searchArgName]: srchVal });
        this.toggleFieldSearchability(false);
        this.render();
      }
    }
  }

  searchHTMLText(srchVal: string, foundFn?: (item: HTMLElement) => void, absentFn?: (item: HTMLElement) => void) {
    const options = this.items.map((item) => {
      return item.el;
    });

    options.forEach((item) => {
      // Search only visible text here (rather than regex'ing on the html) so we only get visible items
      // Also allows us to use pseudo-classes to add non-searchable text.
      if (
        item.textContent &&
        item.textContent.toUpperCase().indexOf(srchVal.toUpperCase()) >= 0 &&
        typeof foundFn === 'function'
      ) {
        foundFn(item);
      } else if (typeof absentFn === 'function') {
        absentFn(item);
      }
    });
  }

  private resetListHighlighting() {
    if (this.noResultsMessage) {
      this.noResultsMessage.remove();
    }

    this.dropDown.querySelectorAll(`.${HIDDEN_CLASS}`).forEach((node) => {
      node.classList.remove(HIDDEN_CLASS);
    });

    this.dropDown.querySelectorAll(`.${HIGHLIGHT_STYLE}`).forEach((node) => {
      node.replaceWith(node.innerHTML);
    });
  }

  private addEmptyMessage(): void {
    if (!this.noResultsMessage) {
      this.noResultsMessage = new BaseObject({
        el: createNode(`<li class="tswui-combo-empty ${DISABLED_CLASS}">(empty)</li>`),
      });

      this.splice(0, 0, this.noResultsMessage);
    }
  }
}
