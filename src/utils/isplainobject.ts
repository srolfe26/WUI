export default function isPlainObject(obj: unknown): boolean {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const proto = Object.getPrototypeOf(obj);
      return proto === Object.prototype || proto === null;
    }

    // Pre-ES5 support
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  // Not an object
  return false;
}
