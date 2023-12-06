import createNode from '../utils/createNode';
import BaseObject from './base-object';
import '../styles/detail.scss';

interface Args {
  summary: string;
  content: HTMLElement;
  [key: string]: any;
}

export default class Detail extends BaseObject {
  private summary!: string;

  private content!: HTMLElement;

  public summaryElement: HTMLElement;

  private summaryTarget: HTMLElement;

  public contentElement: HTMLElement;

  private isOpen = false;

  constructor(args: Args) {
    super();

    Object.assign(this, {
      items: [],
      ...args,
    });

    this.el = createNode(
      '<div class="tswui-detail"><div class="summary"><svg class="toggle-switch" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg><span class="summary-text"></span></div><div class="content"></div></div>'
    ) as HTMLElement;
    this.summaryElement = this.el.querySelector('.summary') as HTMLElement;
    this.summaryTarget = this.el.querySelector('.summary-text') as HTMLElement;
    this.contentElement = this.el.querySelector('.content') as HTMLElement;
    this.setSummary(this.summary);
    this.setContent(this.content);
    this.summaryElement.onclick = this.toggle.bind(this);
  }

  setSummary(summary: string): void {
    this.summary = summary;
    this.summaryTarget.innerHTML = summary;
  }

  setContent(content: HTMLElement): void {
    this.content = content;
    this.contentElement.innerHTML = '';
    this.contentElement.appendChild(content);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.el.classList[this.isOpen ? 'add' : 'remove']('open');
  }

  open(): void {
    this.isOpen = true;
    this.el.classList.add('open');
  }

  close(): void {
    this.isOpen = false;
    this.el.classList.remove('open');
  }
}
