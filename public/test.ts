import { Combo, Form, createNode } from '../src/index';
const combo = new Combo({
  name: 'testing',
  label: 'Test',
  data: [
    { id: 1, name: 'Woody' },
    { id: 2, name: 'Stephen' },
    { id: 3, name: 'Eli' },
    { id: 4, name: 'Kevin' },
    { id: 5, name: 'Chris' },
    { id: 6, name: 'Adam' },
  ],
  valueItem: 'id',
  titleItem: 'name',
});
const form = new Form({
  el: createNode('<form></form>'),
  items: [combo],
});

document.body.appendChild(form.el);
form.appendItems();
combo.setValue(null);
console.log(combo.getValue());
