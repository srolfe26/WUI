export default function getFurthestDescendant(element: HTMLElement): HTMLElement {
    let furthestDescendant: HTMLElement = element;
    let currentElement: HTMLElement | null = element;
  
    while (currentElement && currentElement.children.length > 0) {
      const children = currentElement.children;
      currentElement = children[0] as HTMLElement;
      furthestDescendant = currentElement;
    }
  
    return furthestDescendant;
  }