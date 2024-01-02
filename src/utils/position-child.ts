// @ts-ignore Verge is an older library without typescript support
import verge from 'verge';
import maxz from './maxz';

export default function positionChild(
  parent: HTMLElement,
  child: HTMLElement,
  options?: { spacing?: number; centered?: boolean }
): void {
  const EDGE_OF_VIEWPORT_PADDING = 32;
  const ofst = parent.getBoundingClientRect();
  let top = ofst.top;
  const cWidth = child.offsetWidth;
  const spaceAbove = ofst.top;
  const spaceBelow = verge.viewportH() - spaceAbove - parent.offsetHeight;
  let showBelow = spaceBelow > spaceAbove;
  let leftPosition = ofst.left + parent.offsetWidth - cWidth;
  const anchorRight = leftPosition > 0;

  // Center the child if needed
  if (options?.centered) {
    leftPosition = ofst.left + parent.offsetWidth / 2 - cWidth / 2;
  }

  // Set the child height and determine whether to put the child above or below the parent
  child.style.maxHeight = (showBelow ? spaceBelow : spaceAbove) - EDGE_OF_VIEWPORT_PADDING + 'px';
  const cHeight: number = child.offsetHeight;

  // If there is space, we want to show the item below
  showBelow = showBelow || cHeight < spaceBelow - EDGE_OF_VIEWPORT_PADDING;

  // Add a class to allow different displays depending on position
  top = showBelow ? top + parent.offsetHeight : top - (!isNaN(cHeight) ? cHeight : child.offsetHeight);
  parent.classList[showBelow ? 'remove' : 'add']('positioned-above');
  child.classList[showBelow ? 'remove' : 'add']('positioned-above');

  if (options?.spacing) {
    if (showBelow) {
      top += options.spacing;
    } else {
      top -= options.spacing;
    }
  }

  child.style.left = `${anchorRight ? leftPosition : ofst.left}px`;
  child.style.top = `${top}px`;
  child.style.position = 'fixed';
  child.style.zIndex = String(maxz(child));
}
