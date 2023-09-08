function getBodyElements(): HTMLElement[] {
    let bodyElems: HTMLElement[] = Array.from(document.querySelectorAll('body *'));

    if (bodyElems.length > 2500) {
        bodyElems = [
            ...(<HTMLElement[]>Array.from(document.querySelectorAll('body > *'))),
            ...(<HTMLElement[]>Array.from(document.querySelectorAll('[style*="z-index"]')))
        ];
    }

    return bodyElems;
}

/**
 * Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined.
 *
 * @param       {HTMLElement}   el  (Optional) A parameter passed to this method will be taken as
 *                                  the item itself we are seeking the z-index for and will not
 *                                  include itself when calculating the maximum index (not doing
 *                                  this will increment the z-index of the item every time this
 *                                  method is called on it).
 *
 * @returns     {number}        A number representing the maximum z-index on the page plus one.
 */
export default function (el?: HTMLElement): number {
    const useElems = getBodyElements();
    const topZ = Math.max(
        ...useElems.map(e => {
            if (e.style.position != 'static' && e !== el) {
                return (
                    parseInt(
                        window.getComputedStyle(e).getPropertyValue('z-index'),
                        10
                    ) || 0
                );
            }

            return 0;
        })
    );

    return (!isNaN(topZ) ? topZ : 0) + 1;
}
