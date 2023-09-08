export default function createHTMLElement(htmlString: string): HTMLElement {
    const html = htmlString.trim();
    const temp = document.createElement(/^\<tr\>/.test(html) ? 'tbody' : 'div');

    temp.innerHTML = html;

    return temp.firstChild as HTMLElement;
  }