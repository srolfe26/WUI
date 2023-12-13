import { Text, createNode } from '../index';

export default class Password extends Text {
  private toggleButton: HTMLElement;

  public requiredLength!: number;

  constructor(args: any) {
    super(args);
    Object.assign(this, { requiredLength: 6, ...args });

    this.toggleButton = this.container.querySelector('.field-button') as HTMLElement;

    this.field = this.container.querySelector('[type="password"]') as HTMLInputElement;
    this.el.classList.add('form-password');

    this.toggleButton.addEventListener('click', () => {
      if (this.field.getAttribute('type') === 'password') {
        this.field.setAttribute('type', 'text');
        this.toggleButton.setAttribute('aria-label', 'hide password');
      } else {
        this.field.setAttribute('type', 'password');
        this.toggleButton.setAttribute('aria-label', 'show password');
      }

      this.field.focus();
    });
  }

  get element(): HTMLElement {
    return createNode(`
            <div class="form-item">
                <label class="form-label" ${this.forAttr}>${this.label}</label>
                <div class="field-wrapper">
                    <input type="password" class="form-input primary-color" name="${this.name}" ${this.idAttr} autocomplete="off">
                    <a class="field-button" aria-label="show password">
                        <svg class="turn-visibility-on" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24-5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        <svg class="turn-visibility-off" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.20-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                        </svg>
                    </a>
                </div>
            </div>
        `);
  }

  validationFn(val: string) {
    super.validationFn(val);

    if (this.required && typeof val === 'string' && val.length < this.requiredLength) {
      throw new Error('You must enter a password that is at least 6 characters long.');
    }
  }
}
