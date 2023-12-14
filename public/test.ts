import { Combo, Form, createNode } from '../src/index';

const form = new Form({
  el: createNode('<form></form>'),
  items: [new Combo({})],
});

document.body.appendChild(form.el);
form.appendItems();
