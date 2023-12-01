// @ts-ignore Verge is an older library without typescript support
import verge from 'verge';
import {
  isset,
  createNode,
  getscrollbarwidth,
  getCssStyles,
  applyTextHighlight,
  removeHighlight,
  HIGHLIGHT_STYLE,
  FormItem,
  isPlainObject,
  BaseObject,
  positionChild,
} from '../index';
import '../styles/forms.scss';
import '../styles/combo.scss';

// CSS CLASSES
const DROP_DOWN_CLASS = 'combo-dd';
const HIDDEN_CLASS = 'combo-visually-hidden';
const ITEM_CLASS = 'combo-item';
const DISABLED_CLASS = 'combo-item-disabled';
const CONTAINS_OPTGROUP_CLASS = 'combo-optgroup-container';
const OPTGROUP_LABEL_CLASS = 'combo-optgroup-label';
const OPTGROUP_CLASS = 'combo-optgroup';
const DD_SWITCH_CLASS = 'dd-switch';
const DD_OPEN_CLASS = 'combo-open';
const SELECTED_CLASS = 'combo-list-selected';
const BOUND_CLASS = 'combo-mm-bound';
const NO_RESULTS_CLASS = 'combo-no-results';
const COMBO_LOADING_CLASS = 'combo-loading';
const SCROLL_LOCK_CLASS = 'combo-no-scroll';
const COMBO_SEARCHABLE_CLASS = 'combo-searchable';

// HELPER FUNCTIONS
function eventFire(el: HTMLElement, etype: string): void {
  const event = new Event(etype, { bubbles: true, cancelable: false });

  if (el.dispatchEvent) {
    el.dispatchEvent(event);
  } else {
    document.dispatchEvent(event);
  }
}

function isVisible(el: HTMLElement): boolean {
  return el.offsetParent !== null;
}

function outerHeightMargins(el: HTMLElement): number {
  let height = el.offsetHeight;
  const style = getComputedStyle(el);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}

class ComboItem extends BaseObject {
  public record!: Record<string, unknown>;

  constructor(args: { el: HTMLElement; record: Record<string, unknown> }) {
    super();
    Object.assign(this, args);
  }
}

export default class Combo extends FormItem {
  public dropDownCssClasses!: string;

  public titleItem!: string;

  public valueItem!: string;

  public container!: HTMLElement;

  public field!: HTMLElement;

  public ddToggle!: HTMLElement;

  public searchable!: boolean;

  public searchArgName!: string;

  public placeholder!: string;

  public debugMode!: boolean;

  public searchLocal!: boolean;

  public searchThreshold!: number;

  public showOpenButton!: boolean;

  public noResultsMessage!: boolean;

  public selected!: Record<string, any>[];

  public items: ComboItem[];

  public data!: Record<string, unknown>[];

  private subtemplate!: (data: Record<string, any>) => string;

  private dd!: HTMLElement;

  private input!: HTMLInputElement;

  private _isBlurring!: undefined | boolean;

  private _canSearch!: boolean;

  private _open!: boolean;

  private _justOpened!: boolean;

  private _ensureThreshold!: undefined | number;

  private _selectTypeBuffer!: undefined | string;

  private previous!: string;

  private _blurFn!: (event: Event) => void;

  private _notBlurFn!: (event: Event) => void;

  private _flipFn!: (event: Event) => void;

  private _openFn!: (event: Event) => void;

  private _closeFn!: (event: Event) => void;

  private _selectFn!: (event: Event) => void;

  private _activateFn!: (event: Event) => void;

  private _mouseEnterListener: undefined | ReturnType<typeof setTimeout>;

  constructor(args: Record<string, unknown>) {
    super(args);
    Object.assign(this, {
      dropDownCssClasses: '',
      items: [],
      noResultsMessage: 'No Results.',
      placeholder: '',
      searchLocal: true,
      searchThreshold: 0,
      searchArgName: 'srch', // replace this with a remote search parameter
      selected: [],
      showOpenButton: true,
      titleItem: null,
      valueItem: null,
      searchable: false,
      debugMode: false,
      ...args,
    });

    this.items = [];

    if (!isset(this.titleItem)) {
      this.throw(`A Combo requires a 'titleItem' attribute.`);
    }

    if (!isset(this.valueItem)) {
      this.throw(`A Combo requires a 'valueItem' attribute.`);
    }

    this.initSubtemplate();
    this.createDropDown();

    // DOM elements
    this.el = this.element;
    this.field = this.el.querySelector('.form-input[type="hidden"]') as HTMLElement;
    this.input = this.el.querySelector('.form-input[type="text"]') as HTMLInputElement;
    this.ddToggle = this.el.querySelector('.' + DD_SWITCH_CLASS) as HTMLElement;

    // Events
    this._blurFn = this._isBlurringFalse.bind(this);
    this._notBlurFn = this._notBlurring.bind(this);
    this._flipFn = this._flipSwitch.bind(this);
    this._openFn = this._openDD.bind(this);
    this._closeFn = this._closeDD.bind(this);
    this._selectFn = this._selectClickedOn.bind(this);
    this._activateFn = this._activateListener.bind(this);
    this._setListeners();
    this._addDDToggleListeners();
    this.toggleFieldSearchability(this.searchable);

    // Placeholder text should be set before the combo is build because if a disabled option
    // is set selected on the combo, that will be made the placeholder text, and this would
    // override that.
    this.setPlaceholder(this.placeholder);

    this.refreshData();
  }

  get element() {
    return createNode(`
            <div class="form-item tswui-combo">
                <label class="form-label" ${this.forAttr}>${this.label}</label>
                <div class="field-wrapper">
                    <input type="hidden" name="${this.name}">
                    <input name="${
                      (this.name || 'combo') + (20000 + Math.floor(Math.random() * 100000))
                    }" class="form-input primary-color" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="" ${
                      this.disabled ? 'disabled' : ''
                    } >
                    <a unselectable="on" tabindex="-1" class="field-button ${DD_SWITCH_CLASS}">
                        <svg class="show-when-closed" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
                        <svg class="show-when-open" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
                    </a>
                </div>
            </div>
        `);
  }

  private _notBlurring(event: Event): void {
    event.stopPropagation();
    this._isBlurring = false;
  }

  private _isBlurringFalse(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (document.activeElement === this.field) {
      this._isBlurring = false;
    }
  }

  private _openDD(event: Event): void {
    // this.debug('open dd');
    if (document.activeElement === event.target) {
      event.preventDefault();
    }
    this.open();
  }

  private _closeDD(event: Event): void {
    if (event.target !== this.input) {
      this.setValue(this.value);
      this.close();
    }
  }

  private _selectClickedOn(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (!(event.target instanceof HTMLElement && event.target.classList.contains(DISABLED_CLASS))) {
      this.selectListItem(event.currentTarget as HTMLElement);
      this.set();
      this.close();
    }
  }

  private _flipSwitch(event: Event): void {
    // Required so that the click doesn't trigger the listener on the document for closing
    // the dropdown
    event.preventDefault();
    event.stopPropagation();

    if (this._open === true) {
      this.close();
    } else {
      eventFire(this.input, 'mousedown');
    }
  }

  private _activateListener(event: Event): void {
    this.optionListMouseEnter(true);
    this.dd.removeEventListener(event.type, this._activateFn);
  }

  private _setListeners(): HTMLInputElement {
    this.input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.debug('Enter key pressed');
        this._canSearch = false;

        if (this._open) {
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

      if (event.key === 'Shift') {
        this.debug('Shift key pressed');
        return false;
      }

      if (event.key === 'Tab') {
        this.debug('Tab key pressed');
        if (!this._open) {
          this.set();
        }
      } else {
        if (!['Enter', 'Shift'].includes(event.key)) {
          if (!this._open) {
            this._justOpened = true;
          }
          this.open();
        }

        if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
          event.preventDefault();
          this._canSearch = false;

          switch (event.key) {
            case 'ArrowDown':
              this.debug('Down arrow key');
              this.selectAdjacent(1);
              break;
            case 'ArrowUp':
              this.debug('Up arrow key');
              this.selectAdjacent(-1);
              break;
            case 'Escape':
              this.debug('Escape key');
              this.setValue(this.value);
              this.close();
              break;
          }
        } else {
          this._canSearch = true;
        }
      }
    });

    this.input.addEventListener('keyup', (event: KeyboardEvent) => {
      let key = null;
      this.debug('Key up');

      if (event.key === 'Enter') {
        if (this._open) {
          event.stopPropagation();
          event.preventDefault();
          this.set();
        }
      } else {
        event.stopPropagation();
      }

      if (this._canSearch && !['Tab', 'Shift'].includes(event.key)) {
        if (!this.searchLocal) {
          this.searchData();
        } else {
          if (event.key !== undefined && !event.ctrlKey && !event.metaKey && !event.altKey) {
            key = event.key;

            if (!this._selectTypeBuffer) {
              this._selectTypeBuffer = key;

              setTimeout(() => {
                this._selectTypeBuffer = undefined;
              }, 1000);
            } else {
              this._selectTypeBuffer += key;
            }

            this.searchHTMLText(this._selectTypeBuffer, (itm) => {
              this.selectByEl(itm);
            });
          }
        }
      }
    });

    this.input.addEventListener('focus', (event: FocusEvent) => {
      event.stopPropagation();
      this.debug('Input focused');

      if (this._isBlurring !== true) {
        this._isBlurring = undefined;
      }
    });

    this.input.addEventListener('blur', () => {
      this.debug('Input blur');
      if (this._isBlurring !== false) {
        this.close();
        this._isBlurring = undefined;
      }
    });

    return this.input;
  }

  private _addDDToggleListeners(): void {
    // Add listeners or hide the button
    if (this.showOpenButton === false) {
      this.ddToggle.classList.add(HIDDEN_CLASS);
    } else {
      this.ddToggle.addEventListener('touchstart', this._blurFn);
      this.ddToggle.addEventListener('mousedown', this._blurFn);
      this.ddToggle.addEventListener('touchend', this._flipFn);
      this.ddToggle.addEventListener('click', this._flipFn);
    }

    this.input.addEventListener('touchstart', this._openFn);
    this.input.addEventListener('mousedown', this._openFn);
  }

  private toggleFieldSearchability(override?: boolean): void {
    const isSearchable =
      override !== undefined ? override : this.items.length >= this.searchThreshold || !this.searchLocal;
    const hasNoSelection = this.selected.length === 0 || this.input.value.length === 0;

    if (isSearchable && hasNoSelection) {
      this.el.classList.add(COMBO_SEARCHABLE_CLASS);
      this.input.readOnly = false;

      this.searchThreshold = this._ensureThreshold !== undefined ? this._ensureThreshold : this.searchThreshold;
    } else {
      this.el.classList.remove(COMBO_SEARCHABLE_CLASS);

      if (!isSearchable) {
        this.input.readOnly = true;

        // Preserve the actual searchThreshold value
        this._ensureThreshold = this.searchThreshold;
        this.searchThreshold = 10000;
      }
    }
  }

  private optionListEventsActive(activate: boolean): void {
    // Add this listener separately because it can be turned on and off by the list scrolling
    this.optionListMouseEnter(activate);

    if (activate) {
      this.dd.addEventListener('touchstart', this._notBlurFn);
      this.dd.childNodes.forEach((child) => child.addEventListener('touchstart', this._notBlurFn));
      this.dd.addEventListener('mousedown', this._notBlurFn);

      this.dd.childNodes.forEach((child) => child.addEventListener('touchend', this._selectFn));
      this.dd.childNodes.forEach((child) => child.addEventListener('click', this._selectFn));

      // Moving the mouse within the bounds of the list generally should activate this listener.
      this.dd.addEventListener('mousemove', this._activateFn);
    } else {
      this.dd.removeEventListener('touchstart', this._notBlurFn);
      this.dd.childNodes.forEach((child) => child.removeEventListener('touchstart', this._notBlurFn));
      this.dd.removeEventListener('mousedown', this._notBlurFn);

      this.dd.childNodes.forEach((child) => child.removeEventListener('touchend', this._selectFn));
      this.dd.childNodes.forEach((child) => child.removeEventListener('click', this._selectFn));
      this.dd.removeEventListener('mousemove', this._activateFn);
    }
  }

  private optionListMouseEnter(activate: boolean): void {
    const oneTime = (): void => {
      this.optionListMouseEnter(true);
      this.dd.removeEventListener('mousemove', oneTime);
    };

    if (activate) {
      this._mouseEnterListener = setTimeout(() => {
        this._addMouseEnterListener();
      }, 300);
    } else {
      if (this._mouseEnterListener) {
        clearInterval(this._mouseEnterListener);
      }

      this.dd.classList.remove(BOUND_CLASS);
      this.dd.removeEventListener('mousemove', this._mouseEnterEventHandler.bind(this));

      // Put this listener back on the list in case we want to use it again
      this.dd.addEventListener('mousemove', oneTime);
    }
  }

  private _addMouseEnterListener() {
    if (!this.dd.classList.contains(BOUND_CLASS)) {
      this.dd.classList.add(BOUND_CLASS);
      this.dd.addEventListener('mousemove', this._mouseEnterEventHandler.bind(this));
    }
  }

  private _mouseEnterEventHandler(event: MouseEvent) {
    event.stopPropagation();

    if (event.target instanceof HTMLElement && event.target.classList.contains(ITEM_CLASS)) {
      this.selectListItem(event.target);

      if (this._mouseEnterListener) {
        clearInterval(this._mouseEnterListener);
      }
    }
  }

  private lockBodyScroll(lockIt = true): HTMLElement {
    const body = document.body;
    let scrollTop: number;

    const bodyResize = () => {
      this.lockBodyScroll();
      this.sizeAndPositionDD();
      body.style.width = body.offsetWidth + 'px';
      this.lockBodyScroll(true);
    };

    // Only necessary to lock scrolling if the body height is larger than the viewport.
    if (lockIt === true && outerHeightMargins(body) > verge.viewportH()) {
      body.style.top = window.scrollY * -1 + 'px';
      body.style.width = body.offsetWidth + 'px'; // We have to manage body width here because putting 'width:100%' in
      // the CSS class doesn't work for a body that has a margin.
      body.classList.add(SCROLL_LOCK_CLASS);

      // Since we're manually setting width on the body, we have to account for window resize
      window.addEventListener('resize', bodyResize.bind(this));
    } else {
      scrollTop = parseInt(body.style.top, 10) * -1;

      body.classList.remove(SCROLL_LOCK_CLASS);
      body.style.top = '';
      body.style.width = '';

      window.scroll(0, scrollTop);
      window.removeEventListener('resize', bodyResize.bind(this));
    }

    return body;
  }

  private scrollToCurrent() {
    const firstSelect = this.dd.querySelectorAll(`.${SELECTED_CLASS}`)[0] as HTMLElement;
    const ofstP = firstSelect ? firstSelect.offsetParent : firstSelect;
    const ddHeight = parseFloat(getComputedStyle(this.dd, null).height.replace('px', ''));
    const offset = (() => {
      let currentNode = firstSelect;
      let r = 0;

      while (currentNode) {
        r += currentNode.offsetHeight;
        currentNode = currentNode.previousSibling as HTMLElement;
      }

      const firstSelectOffsetHeight = firstSelect?.offsetHeight ?? 0;
      r -= ddHeight / 2 - firstSelectOffsetHeight / 2;

      return r;
    })();

    // 'Mouseenter' listener can interfere if the mouse is over the option list.
    this.optionListMouseEnter(false);
    if (ofstP) {
      ofstP.scrollTop = offset;
    }
  }

  private sizeAndPositionDD(): void {
    this.dd.style.visibility = 'hidden';
    this.dd.classList.remove(HIDDEN_CLASS);
    this.adjustDropDownWidth();
    positionChild(this.input, this.dd);
    this.dd.style.visibility = '';

    // Select the current item in the option list and scroll to it.
    if (isPlainObject(this.value)) {
      this.getItemBy(this.valueItem, this.value[this.valueItem]);
      this.scrollToCurrent();
    }
  }

  private getItemBy(key: string, val: any): any {
    let retVal;

    this.each((item) => {
      if (
        (item.record[key] !== undefined && item.record[key] === val) ||
        (!isNaN(parseFloat(val)) && parseFloat(val) === parseFloat(item.record[key]))
      ) {
        retVal = item;

        // false breaks out of the loop when a match is found
        return false;
      }

      return true;
    });

    return retVal;
  }

  private each(fn: (item: any, index: number) => boolean, ascending = true): boolean {
    let i = 0;
    const arry = this.items || this;

    if (!Array.isArray(arry)) {
      return false;
    }

    if (ascending !== false) {
      for (i; i < arry.length; i++) {
        if (fn(arry[i], i) === false) {
          break;
        }
      }
    } else {
      for (i = arry.length; i >= 0; i--) {
        if (fn(arry[i], i) === false) {
          break;
        }
      }
    }

    return true;
  }

  private adjustDropDownWidth(): void {
    let width: number;
    let widestChild = 0;

    const getComputedWidth = (el: HTMLElement) => {
      return parseInt(window.getComputedStyle(el).width, 10);
    };

    // Look at the size of any style on the item, if width is explicitly defined,
    // don't change it here (max-width doesn't apply). Storing the variable here also makes
    // it so this is only calculated once, and so the effect of this method doesn't interfere
    // with future running of this method.
    if (!isset(this.dd.tswuiO)) {
      this.dd.tswuiO = getCssStyles(this.dd);
      this.dd.dataset.cssWidth = this.dd.tswuiO.width;
    }

    // The drop-down has to be display block, but we don't necessarily want to show it
    if (!this._open) {
      this.dd.style.visibility = 'hidden';
      this.dd.classList.remove(HIDDEN_CLASS);
    }

    // Clear the current width on the field
    this.dd.style.width = '';

    if (isNaN(parseInt(this.dd.dataset.cssWidth || '', 10)) && String(this.dd.dataset.cssWidth).indexOf('calc') !== 0) {
      // As default, set drop-down width according to the width of the field
      width = getComputedWidth(this.input) < 100 ? 100 : getComputedWidth(this.input);

      // Add the scrollbar width, just in case the content scrolls
      widestChild = this.dd.offsetWidth + getscrollbarwidth();

      // Set drop-down to the widest between the field and its children, or to the field
      // if the widestChild is wider than the viewport
      width =
        width > widestChild || widestChild + this.input.getBoundingClientRect().left > verge.viewportW()
          ? width
          : widestChild;
      this.dd.style.width = width + 'px';
    }

    if (!this._open) {
      this.dd.classList.add(HIDDEN_CLASS);
    }
  }

  private resetListHighlighting() {
    const noResultsMessage = this.dd.querySelector(`.${NO_RESULTS_CLASS}`);

    // Remove 'no results' messages added by this method
    if (noResultsMessage) {
      noResultsMessage.parentNode?.removeChild(noResultsMessage);
    }

    this.dd.querySelectorAll(`.${HIDDEN_CLASS}`).forEach((node) => {
      node.classList.remove(HIDDEN_CLASS);
    });

    this.dd.querySelectorAll(`.${HIGHLIGHT_STYLE}`).forEach((node) => {
      // Uncomment the line below to replace the content of elements with class HIGHLIGHT_STYLE
      // node.replaceWith(node.innerHTML);
    });
  }

  private setFieldValue(text: string): HTMLInputElement {
    text = text.trim();
    this.input.value = text;
    this.setFieldTitleAttr(text);

    return this.input;
  }

  private setFieldTitleAttr(text: string): void {
    if (
      isset(this.value) &&
      this.value.disabled !== true &&
      text.length === 0 &&
      String(this.value[this.valueItem]).trim().length === 0
    ) {
      text = 'A blank value is selected.';
    }

    if (text.length > 0) {
      this.input.setAttribute('title', text);
    } else {
      this.input.removeAttribute('title');
    }
  }

  private addNoResultsMessage(): void {
    const messageEl = createNode(`<li class="${NO_RESULTS_CLASS} ${DISABLED_CLASS}">${this.noResultsMessage}</li>`);

    if (this.dd.hasChildNodes()) {
      this.dd.insertBefore(messageEl, this.dd.firstChild);
    } else {
      this.dd.appendChild(messageEl);
    }
  }

  private highlightText(srchVal: string) {
    const searchRegex = new RegExp(srchVal, 'ig');

    // We have a search string, highlight and hide stuff
    if (srchVal !== undefined && srchVal.trim().length !== 0) {
      // Un-hide all optgroups and remove 'no results' message
      this.dd.querySelectorAll(`.${OPTGROUP_LABEL_CLASS}.${HIDDEN_CLASS}`).forEach((node) => {
        node.classList.remove(HIDDEN_CLASS);
      });

      const noResultsItem = this.dd.querySelector(`.${NO_RESULTS_CLASS}`);
      if (noResultsItem) {
        noResultsItem.parentNode?.removeChild(noResultsItem);
      }

      this.searchHTMLText(
        srchVal,
        (itm) => applyTextHighlight(itm, searchRegex).classList.remove(HIDDEN_CLASS),
        (itm) => removeHighlight(itm).classList.add(HIDDEN_CLASS)
      );

      // Clear disabled items in a search
      this.dd.querySelectorAll(`.${DISABLED_CLASS}`).forEach((node) => node.classList.add(HIDDEN_CLASS));

      // Clear any optgroups that don't have visible items in them
      this.dd.querySelectorAll('.wui-optgroup-label').forEach((group) => {
        let visCount = 0;

        group.childNodes.forEach((child) => (visCount += isVisible(child as HTMLElement) ? 1 : 0));

        if (visCount === 0) {
          group.classList.add(HIDDEN_CLASS);
        }
      });

      // If there are no visible items, add the no results message as a disabled item
      let visibleCount = 0;
      this.dd.childNodes.forEach((node) => {
        if (isVisible(node as HTMLElement)) {
          visibleCount++;
        }
      });
      if (visibleCount === 0) {
        this.addNoResultsMessage();
      }
    } else {
      this.resetListHighlighting();
    }

    positionChild(this.input, this.dd);
  }

  initSubtemplate(): void {
    // Create template if one hasn't been defined
    if (
      !(this.hasOwnProperty('subtemplate') && typeof this.subtemplate === 'function') &&
      this.hasOwnProperty('valueItem') &&
      this.hasOwnProperty('titleItem') &&
      this.valueItem !== undefined &&
      this.titleItem !== undefined
    ) {
      this.subtemplate = (data) => `<li>${data[this.titleItem]}</li>`;
    }
  }

  createDropDown(): void {
    if (!this.dd) {
      this.dd = createNode(`<ul class="${DROP_DOWN_CLASS} ${HIDDEN_CLASS}"></ul>`);

      // Add custom CSS classes
      this.dd.classList.add(...this.dropDownCssClasses);

      // Prevent the field from losing focus if a user clicks on disabled items in the list
      this.dd.addEventListener('touchend', () => this.input.focus());
      this.dd.addEventListener('click', () => this.input.focus());

      // Assuming createNode is defined elsewhere in your code
      document.body.appendChild(this.dd);
    }
  }

  setPlaceholder(placeholder: string): string {
    this.placeholder = placeholder;
    this.input.setAttribute('placeholder', placeholder);

    return placeholder;
  }

  selectListItem(item: HTMLElement): void {
    if (!(isset(this.selected[0]) && this.selected[0].el === item)) {
      this.itemSelect(item);
    }
  }

  open(): void {
    if (!this._open && !this.disabled) {
      this._open = true;

      this.lockBodyScroll(true);

      // Change the dropdown button to a close button
      this.el.classList.add(DD_OPEN_CLASS);

      // Clear any previous searching
      this.resetListHighlighting();

      // Set listeners when option list is open
      this.optionListEventsActive(true);

      // Close the drop down when the field loses focus.
      document.addEventListener('click', this._closeFn);

      this.sizeAndPositionDD();
      this.input.focus();
      this.input.select();
      this._addMouseEnterListener();
    }
  }

  close(): void {
    // Turn off event listeners for list items
    document.removeEventListener('click', this._closeFn);
    this.optionListEventsActive(false);

    if (this._open === true) {
      this._open = false;
      this.lockBodyScroll();
      this.dd.classList.add(HIDDEN_CLASS);

      // Change the dropdown button to a close button
      this.el.classList.remove(DD_OPEN_CLASS);

      // Make sure there is nothing weird left in the search box on close, it should
      // reflect the value of the field.
      if (isPlainObject(this.value)) {
        this.setFieldValue(this.value[this.titleItem]);
      }

      // Only reselect the field in the instance that the close options list button was pressed.
      if (this._isBlurring !== undefined) {
        this._isBlurring = true;
        this.input.focus();
        this.input.select();
      }
    }
  }

  refreshData(searchParams?: any) {
    this.make();
  }

  set(): void {
    const selection = this.selected[0];

    if (selection) {
      const record = selection.tswuiO.record;

      // Avoid an infinite loop by checking if the value is different
      if (this.value !== record) {
        this.setValue(record);
      }

      // Set the field to the value
      if (record.disabled !== true) {
        this.setFieldValue(record[this.titleItem]);
        this.setPlaceholder('');
        this.toggleFieldSearchability();
      } else {
        this.setPlaceholder(record[this.titleItem]);
      }
    } else {
      this.setFieldValue('');
    }

    if (this._open) {
      this.close();
    }
  }

  debug(message: string) {
    if (this.debugMode === true) {
      console.log(message);
    }
  }

  selectAdjacent(dir: number) {
    // Determine the visible elements.
    const options: HTMLElement[] = this.items
      .filter((item) => item.record.disabled !== true && isVisible(item.el))
      .map((item) => item.el);

    // Get the index of the selected element in the current options array (if any).
    const selectedIndex = (() => {
      let retVal: number | undefined;

      // If there is a selected item, move from it, else go from an end.
      if (this.selected.length > 0) {
        options.forEach((option, index) => {
          if (option === this.selected[0].el) {
            retVal = index;
          }
        });
      }

      return retVal;
    })();

    // Determine the value of the edge depending on an arrow key.
    const theEnd = dir > 0 ? 0 : options.length - 1;
    let item: any;
    let el: Element | undefined;

    // If the drop-down was just opened, we only want to show the selected item, not change it.
    if (this._justOpened === true) {
      dir = 0;
      this._justOpened = false;
    }

    // If there is a selected item, move from it, else go from an end.
    if (!isNaN(parseInt(selectedIndex as any, 10)) && selectedIndex !== undefined) {
      el = options[selectedIndex + dir];
    } else {
      el = options[theEnd];
    }

    item = this.selectByEl(el as HTMLElement);

    // If the item is not a plain object, we're likely on an edge. Go to the other end of the list.
    if (!isPlainObject(item)) {
      item = this.selectByEl(options[theEnd]);
    }
  }

  searchData() {
    const srchVal = this.input.value.trim();
    const oldSearch = this.previous || undefined;
    const searchParams: any = {};

    this.previous = srchVal;

    if (this.searchLocal && this.searchable) {
      this.highlightText(srchVal);
    } else {
      if ((srchVal.length >= this.searchThreshold || srchVal.length === 0) && this.previous != oldSearch) {
        searchParams[this.searchArgName] = srchVal;
        this.refreshData(searchParams);
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

  selectByEl(el: HTMLElement, doScroll = true) {
    let retVal;

    if (el) {
      retVal = this.itemSelect(el.tswuiO as BaseObject);

      if (doScroll !== false) {
        this.scrollToCurrent();
      }
    }

    return retVal;
  }

  private itemSelect(item: HTMLElement | BaseObject, silent?: true) {
    if (this.dd.querySelector('.' + SELECTED_CLASS)) {
      (this.dd.querySelector('.' + SELECTED_CLASS) as Element).classList.remove(SELECTED_CLASS);
    }

    if (item) {
      const el: HTMLElement = (item as BaseObject).el || item;

      el.classList.add(SELECTED_CLASS);
      this.selected = [el];

      if (!silent) {
        const event = new CustomEvent('combo-change', {
          detail: {
            combo: this,
            selected: el.tswuiO,
            select_list: this.selected,
          },
        });
        this.el.dispatchEvent(event);
      }
    } else {
      this.selected = [];
    }

    return item;
  }

  public make(): number {
    const holder = document.createElement('div');
    const optGroups: Record<string, any> = {};

    this.items = [];

    this.data.forEach((record: any) => {
      const templateString = this.subtemplate(record);
      const item = new ComboItem({
        el: createNode(templateString),
        record: record,
      });

      // Add newly made item to the items array which represents data (record) bound with a
      // DOM node (el).
      this.items.push(item);

      // Bind data for all but disabled items, add a class to identify those
      if (record.disabled !== true) {
        item.el.tswuiO = item;
        item.el.classList.add(ITEM_CLASS);
      } else {
        item.el.classList.add(DISABLED_CLASS);
      }

      // Put item into optgroups if necessary
      if (isset(record.optgroup) && String(record.optgroup).length !== 0) {
        if (isset(optGroups[record.optgroup])) {
          optGroups[record.optgroup].appendChild(item.el);
        } else {
          const optGroupEl = createNode(`
                    <li class=${CONTAINS_OPTGROUP_CLASS}>
                        <span class="${OPTGROUP_LABEL_CLASS}">${record.optgroup}</span>
                        <ul class="${OPTGROUP_CLASS}"></ul>
                    </li>`);

          optGroupEl.appendChild(item.el);
          holder.appendChild(optGroupEl);
          optGroups[record.optgroup] = optGroupEl.querySelector('ul');
        }
      } else {
        holder.appendChild(item.el);
      }
    });

    // Clear out drop down and append newly created children
    this.dd.innerHTML = '';

    while (holder.firstChild) {
      this.dd.appendChild(holder.firstChild);
    }

    // Reset listeners that determine whether interaction with the drop down
    // will blur focus away from the field.
    this.dd.removeEventListener('touchstart', this._blurFn);
    this.dd.removeEventListener('mousedown', this._blurFn);
    this.dd.addEventListener('touchstart', this._blurFn);
    this.dd.addEventListener('mousedown', this._blurFn);

    // Show some feedback even with no data, or select current if it exists.
    if (this.data.length === 0) {
      this.addNoResultsMessage();
    } else {
      this.highlightText(this.previous);
    }

    // Necessary here because remote queries will remake the list with every keystroke and
    // that can change the size/position of the options list.
    this.sizeAndPositionDD();
    this.el.classList.remove(COMBO_LOADING_CLASS);

    return this.items.length;
  }
}
