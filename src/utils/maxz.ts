function getBodyElements(): HTMLElement[] {
  let bodyElems: HTMLElement[] = Array.from(
    document.querySelectorAll('body *'),
  );

  if (bodyElems.length > 2500) {
    bodyElems = [
      ...(<HTMLElement[]>Array.from(document.querySelectorAll('body > *'))),
      ...(<HTMLElement[]>(
        Array.from(document.querySelectorAll('[style*="z-index"]'))
      )),
    ];
  }

  return bodyElems;
}

export default function (el?: HTMLElement): number {
  const useElems = getBodyElements();
  const topZ = Math.max(
    ...useElems.map((e) => {
      if (e.style.position != 'static' && e !== el) {
        return (
          parseInt(
            window.getComputedStyle(e).getPropertyValue('z-index'),
            10,
          ) || 0
        );
      }

      return 0;
    }),
  );

  return (!isNaN(topZ) ? topZ : 0) + 1;
}
