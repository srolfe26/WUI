// @ts-ignore Verge is an older library without typescript support
import verge from 'verge';
import maxz from './maxz';

export default function positionChild(parent: HTMLElement, child: HTMLElement): void {
  const ARBITRARY_PADDING = 16;
  const ofst = parent.getBoundingClientRect();
  let top = ofst.top;
  const cWidth = child.offsetWidth;
  const spaceAbove = ofst.top;
  const spaceBelow = verge.viewportH() - spaceAbove - parent.offsetHeight;
  let showBelow = spaceBelow > spaceAbove;
  const leftPosition = ofst.left + parent.offsetWidth - cWidth;
  const anchorRight = leftPosition > 0;

  // Set the child height and determine whether to put the child above or below the parent
  child.style.maxHeight = (showBelow ? spaceBelow : spaceAbove) - ARBITRARY_PADDING + 'px';
  const cHeight: number = child.offsetHeight;

  // If there is space, we want to show the item below
  showBelow = showBelow || cHeight < spaceBelow - ARBITRARY_PADDING;

  // Add a class to allow different displays depending on position
  top = showBelow ? top + parent.offsetHeight : top - (!isNaN(cHeight) ? cHeight : child.offsetHeight);
  parent.classList[showBelow ? 'remove' : 'add']('positioned-above');
  child.classList[showBelow ? 'remove' : 'add']('positioned-above');

  child.style.left = `${anchorRight ? leftPosition : ofst.left}px`;
  child.style.top = `${top}px`;
  child.style.position = 'fixed';
  child.style.zIndex = String(maxz(child));
}
