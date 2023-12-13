import { Page, createNode, BaseObject, Toolbar, Button } from '../src/index';
import MenuList from './MenuList';

export default class MenuPanel extends Page {
  private menuList: MenuList;

  private toolbar: Toolbar;

  constructor(args: object = {}) {
    super(args);

    this.el.classList.add('list-page');

    this.toolbar = new Toolbar({
      items: [
        new BaseObject({
          el: createNode(`
                <div class="${Toolbar.TOOLBAR_CENTER}">
                    <div class="toolbar-title no-overflow">WUI Test</div>
                </div>
            `),
        }),
        new Button({
          text: 'Test Button',
          onClick: () => console.log('test'),
        }),
      ],
    });

    this.items = [this.toolbar, (this.menuList = new MenuList(args))];
  }

  show(): Promise<unknown> {
    this.menuList.render();
    return super.show();
  }
}
