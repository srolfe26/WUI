import isset from '../utils/isset';

class BreakException {}

interface ObjectError {
  message: string;
  object: any;
  code?: number;
}

class ObjectError extends Error {
  constructor(message: string, object: any, code?: number) {
    super(message);
    this.object = object;

    if (isset(code)) {
      this.code = code;
    }
  }
}

declare global {
  interface HTMLElement {
    tswuiO: BaseObject;
  }
}

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

  get EXCEPTION(): BreakException {
    return BreakException;
  }

  error(message: string, code?: number): void {
    throw new ObjectError(message, this, code);
  }

  breakEach(items: any[], fn: (item: any, index: number) => void): void {
    try {
      items.forEach(fn);
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
  }

  appendItems(...elements: Array<HTMLElement | BaseObject>): void {
    const me = this;
    const parent: HTMLElement = me.elAlias || me.el;

    me.items.forEach((item: any) => {
      if (this._isNode(item.el) && parent) {
        item.parent = me;
        parent.appendChild(item.el);

        if (item instanceof BaseObject) {
          item.appendItems();
        }
      } else {
        console.warn('Item does not have an el property defined as an HTMLElement', item);
      }
    });
  }

  splice(startIndex: number, deleteCount: number, ...newChildren: BaseObject[]): BaseObject[] {
    const me = this;
    const parent: HTMLElement = me.elAlias || me.el;

    // Remove existing children
    for (let i = 0; i < deleteCount; i++) {
      parent.removeChild(parent.children[startIndex]);
    }

    // standard splice functionality on items array
    const removedChildren = Array.prototype.splice.apply(me.items, [startIndex, deleteCount, ...newChildren]);

    // Insert new children on DOM
    const insertionIndex = startIndex;
    for (let i = newChildren.length - 1; i >= 0; i--) {
      newChildren[i].parent = me;
      parent.insertBefore(newChildren[i].el, parent.children[insertionIndex]);
    }

    return removedChildren;
  }

  indexOf(findItem: any): number {
    const me = this;
    let index = -1;

    me.breakEach(me.items, (item: any, idx: number) => {
      if (item === findItem) {
        index = idx;
        throw BreakException;
      }
    });

    return index;
  }

  removeItem(removeItem: any): any {
    const me = this;
    const target = me.elAlias || me.el;
    const index = me.indexOf(removeItem);

    if (!target) {
      throw new Error('An el or elAlias must exist to remove items.');
    }

    if (index > -1) {
      if (target.contains(removeItem.el)) {
        target.removeChild(removeItem.el);
      }

      me.items.splice(index, 1);

      return removeItem;
    } else {
      return undefined;
    }
  }

  push(...elements: Array<BaseObject>): void {
    const me = this;
    const parent: HTMLElement = me.elAlias || me.el;

    me.items.push(...elements);

    elements.forEach((element: BaseObject) => {
      element.parent = me;
      parent.appendChild(element.el);
      if (typeof element.appendItems === 'function') {
        element.appendItems();
      }
    });
  }

  empty(): void {
    this.splice(0, this.items.length);
  }

  get parentCanRemoveMe(): boolean {
    return this.parent instanceof BaseObject;
  }

  remove(): any {
    let item: any;

    if (this.parentCanRemoveMe) {
      item = this.parent?.removeItem(this);
    } else if (this.el?.parentNode) {
      item = this.el.parentNode.removeChild(this.el);
    }

    return item;
  }
}
