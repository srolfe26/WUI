import createNode from './createNode';

declare global {
  interface Window {
    scrollbarWidth: number;
  }
}

/**
 * Determines the width of the scroll bar for the current browser/OS
 *
 * @returns {number} The width of the scrollbar
 */
export default function (): number {
  if ((window as Window).scrollbarWidth === undefined) {
    const parent: HTMLElement = createNode(`<div style="width:50px;height:50px;overflow:auto"><div> </div></div>`);
    const child: HTMLElement = parent.firstChild as HTMLElement;
    document.body.appendChild(parent);

    const initWidth: number = parseInt(window.getComputedStyle(child).width, 10);
    child.style.height = '99px';
    const changedWidth: number = parseInt(window.getComputedStyle(child).width, 10);
    document.body.removeChild(parent);
    (window as Window).scrollbarWidth = initWidth - changedWidth;
  }

  return (window as Window).scrollbarWidth;
}
