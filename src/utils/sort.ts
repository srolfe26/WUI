import isset from './isset';
import isPlainObject from './isplainobject';

const SORT_ASCENDING = 1;
const SORT_DESCENDING = -1;
const TYPE_NUMBER = 'number';
const TYPE_FUNCTION = 'function';
const TYPE_DATETIME = 'date';
const TYPE_TIMESTAMP = 'timestamp';
const TYPE_STRING = 'string';

class SortItem {
  name!: string;

  fn!: (a: any, b: any) => number;

  type: string;

  direction: number;

  constructor(args: { name: string; type?: string; direction?: number; fn: (a: any, b: any) => number }) {
    const configs = {
      type: SortItem.TYPE_STRING,
      direction: SortItem.SORT_ASCENDING,
      ...args,
    };

    if (!isset(configs.name)) {
      throw new Error('A name must be specified for a SortItem.');
    }

    this.name = configs.name;
    this.type = configs.type;
    this.direction = configs.direction;
  }

  static get SORT_ASCENDING() {
    return SORT_ASCENDING;
  }

  static get SORT_DESCENDING() {
    return SORT_DESCENDING;
  }

  static get TYPE_NUMBER() {
    return TYPE_NUMBER;
  }

  static get TYPE_FUNCTION() {
    return TYPE_FUNCTION;
  }

  static get TYPE_DATETIME() {
    return TYPE_DATETIME;
  }

  static get TYPE_TIMESTAMP() {
    return TYPE_TIMESTAMP;
  }

  static get TYPE_STRING() {
    return TYPE_STRING;
  }
}

class Sorter {
  configs: { debug: boolean; sortType?: any };

  sorters!: SortItem[];

  constructor(args: { debug?: boolean }) {
    this.configs = {
      debug: false,
      ...args,
    };
  }

  sort(data: any[], sorters: SortItem[]) {
    if (!this._isArrayOfObjects(data)) {
      throw new Error('Data is not an array of objects.');
    }

    if (!this._isArrayOfSortItems(sorters)) {
      throw new Error('Sorters is not an array of SortItems.');
    }

    this.sorters = sorters;
    const dataCopy = [...data];

    dataCopy.sort((a, b) => {
      return this._sort(0, a, b);
    });

    return dataCopy;
  }

  private _sort(depth: number, a: any, b: any): number {
    if (this.sorters.length === 0) {
      return 0;
    }

    const sorter = this.sorters[depth || 0];
    let compA = a[sorter.name];
    let compB = b[sorter.name];
    let comparison = 0;

    if (typeof sorter.type === SortItem.TYPE_FUNCTION) {
      comparison = sorter.fn(compA, compB);
    } else {
      switch (sorter.type) {
        case SortItem.TYPE_TIMESTAMP:
          compA = compA ? compA.valueOf() : Number.MIN_SAFE_INTEGER.toString();
          compB = compB ? compB.valueOf() : Number.MIN_SAFE_INTEGER.toString();

          if (compA) {
            comparison = compA.localeCompare(compB);
          } else if (compB) {
            comparison = compB.localeCompare(compA);
          }
          break;
        case SortItem.TYPE_DATETIME:
          compA = new Date(compA);
          compB = new Date(compB);
          comparison = compA.getTime() === compB.getTime() ? 0 : compA.getTime() > compB.getTime() ? 1 : -1;
          break;
        case SortItem.TYPE_NUMBER:
          compA = Number(compA);
          compB = Number(compB);
          comparison = compA === compB ? 0 : compA > compB ? 1 : -1;
          break;
        default:
          comparison = String(compA).trim().toUpperCase().localeCompare(String(compB).trim().toUpperCase());
      }
    }

    if (this.configs.debug === true) {
      console.log(
        compA,
        compB,
        comparison,
        `direction ${sorter.direction}`,
        `depth: ${depth}`,
        `has next: ${this.sorters[depth + 1] !== undefined}`
      );
    }

    if (comparison !== 0 || this.sorters[depth + 1] === undefined) {
      return comparison * sorter.direction;
    } else {
      return this._sort(depth + 1, a, b);
    }
  }

  private _isArrayOfSortItems(arr: any): boolean {
    if (!Array.isArray(arr)) {
      return false;
    }

    return typeof arr.sort === 'function' && (arr.length === 0 || (arr.length > 0 && arr[0] instanceof SortItem));
  }

  private _isArrayOfObjects(arr: any): boolean {
    if (!Array.isArray(arr)) {
      return false;
    }

    return (
      typeof arr.sort === 'function' &&
      (arr.length === 0 ||
        (arr.length > 0 && isPlainObject(arr[0])) ||
        (this.configs.sortType && arr[0] instanceof this.configs.sortType))
    );
  }
}

export { SortItem, Sorter };
