import isset from '../utils/isset';

class BreakException extends Error {}

declare global {
  interface HTMLElement {
    tswuiO: BaseObject | Record<string, any>;
  }
}

export default class BaseObject {
  elAlias: HTMLElement | undefined;

  el!: HTMLElement;

  items!: Array<BaseObject>;

  parent: BaseObject | undefined;

  constructor(configs?: { [key: string]: unknown }) {
    if (configs) {
      Object.assign(this, configs);
    }
    this.items = [];
  }

  private _isNode(node: unknown): boolean {
    return isset(node) && node instanceof HTMLElement;
  }

  get EXCEPTION(): BreakException {
    return new BreakException('Break outta this loop');
  }

  breakEach(items: unknown[], fn: (item: unknown, index: number) => void): void {
    try {
      items.forEach(fn);
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
  }

  appendItems(): void {
    const parent: HTMLElement = this.elAlias || this.el;

    this.items.forEach((item: BaseObject) => {
      if (this._isNode(item.el) && parent) {
        item.parent = this;
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
    const parent: HTMLElement = this.elAlias || this.el;

    // Remove existing children
    for (let i = 0; i < deleteCount; i++) {
      parent.removeChild(parent.children[startIndex]);
    }

    // standard splice functionality on items array
    const removedChildren = Array.prototype.splice.apply(this.items, [startIndex, deleteCount, ...newChildren]);

    // Insert new children on DOM
    const insertionIndex = startIndex;
    for (let i = newChildren.length - 1; i >= 0; i--) {
      newChildren[i].parent = this;
      parent.insertBefore(newChildren[i].el, parent.children[insertionIndex]);
    }

    return removedChildren;
  }

  indexOf(findItem: unknown): number {
    let index = -1;

    this.breakEach(this.items, (item: unknown, idx: number) => {
      if (item === findItem) {
        index = idx;
        throw BreakException;
      }
    });

    return index;
  }

  removeItem(removeItem: BaseObject): BaseObject | undefined {
    const target = this.elAlias || this.el;
    const index = this.indexOf(removeItem);

    if (!target) {
      throw new Error('An el or elAlias must exist to remove items.');
    }

    if (index > -1) {
      if (target.contains(removeItem.el)) {
        target.removeChild(removeItem.el);
      }

      this.items.splice(index, 1);

      return removeItem;
    } else {
      return undefined;
    }
  }

  push(...elements: Array<BaseObject>): void {
    const parent: HTMLElement = this.elAlias || this.el;

    this.items.push(...elements);

    elements.forEach((element: BaseObject) => {
      element.parent = this;
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

  remove(): unknown {
    let item: unknown;

    if (this.parentCanRemoveMe) {
      item = this.parent?.removeItem(this);
    } else if (this.el?.parentNode) {
      item = this.el.parentNode.removeChild(this.el);
    }

    return item;
  }
}
