/**
 * Gets an object containing all the styles defined for an object from stylesheets to inline styles.
 *
 * @param   {HTMLElement}   elem    The element for which to get styles.
 *
 * @returns {CSSStyleDeclaration}   CSSStyleDeclaration containing key value pairs of style rules and their values.
 */
export default function getCSSStyles(elem: HTMLElement): CSSStyleDeclaration {
  const result: CSSStyleDeclaration = {} as CSSStyleDeclaration;
  const styles: CSSStyleSheet[] = Array.from(document.styleSheets) as CSSStyleSheet[];

  styles.forEach((stylesheet: CSSStyleSheet) => {
    // some stylesheets don't have rules
    if (!stylesheet.hasOwnProperty('cssRules')) {
      return;
    }

    Array.from(stylesheet.cssRules).forEach((rule: CSSRule) => {
      if (!rule) {
        return;
      }

      // account for multiple rules split by a comma
      const selectors = (rule as CSSStyleRule).selectorText.split(',');

      selectors.forEach((selector: string) => {
        if (elem.matches(selector)) {
          for (let index = 0; index < (rule as CSSStyleRule).style.length; ++index) {
            const prop = (rule as CSSStyleRule).style[index];
            // @ts-ignore
            result[prop] = (rule as CSSStyleRule).style[prop];
          }
        }
      });
    });
  });

  return { ...result, ...elem.style };
}
