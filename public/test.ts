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

const emptyCombo = new Combo({
  name: 'empty',
  label: 'Empty',
  valueItem: 'id',
  titleItem: 'name',
});

const remoteCombo = new Combo({
  name: 'remote',
  label: 'Remote',
  searchRemote: true,
  valueItem: 'id',
  titleItem: 'name',
  refreshData: async (searchParams) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(searchParams);
        // @ts-ignore
        resolve();
      }, 1000);
    });
  },
});

const form = new Form({
  el: createNode('<form></form>'),
  items: [combo, emptyCombo, remoteCombo],
});

document.body.appendChild(form.el);
form.appendItems();
combo.setValue(2);
console.log(form.getData());

// @ts-ignore
window.form = form;
