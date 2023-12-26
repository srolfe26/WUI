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
    { id: 7, name: 'John' },
    { id: 8, name: 'Derek' },
    { id: 9, name: 'Michael' },
    { id: 10, name: 'David' },
    { id: 11, name: 'Matt' },
    { id: 12, name: 'Chris' },
    { id: 13, name: 'Adam' },
    { id: 14, name: 'John' },
    { id: 15, name: 'Derek' },
    { id: 16, name: 'Michael' },
    { id: 17, name: 'David' },
    { id: 18, name: 'Matt' },
    { id: 19, name: 'Chris' },
    { id: 20, name: 'Adam' },
    { id: 21, name: 'John' },
    { id: 22, name: 'Derek' },
    { id: 23, name: 'Michael' },
    { id: 24, name: 'David' },
    { id: 25, name: 'Matt' },
    { id: 26, name: 'Chris' },
    { id: 27, name: 'Adam' },
    { id: 28, name: 'John' },
    { id: 29, name: 'Derek' },
    { id: 30, name: 'Michael' },
    { id: 31, name: 'David' },
    { id: 32, name: 'Matt' },
    { id: 33, name: 'Chris' },
    { id: 34, name: 'Adam' },
    { id: 35, name: 'John' },
    { id: 36, name: 'Derek' },
    { id: 37, name: 'Michael' },
    { id: 38, name: 'David' },
    { id: 39, name: 'Matt' },
    { id: 40, name: 'Chris' },
    { id: 41, name: 'Adam' },
    { id: 42, name: 'John' },
    { id: 43, name: 'Derek' },
    { id: 44, name: 'Festus' },
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
combo.setValue(44);
console.log(form.getData());

// @ts-ignore
window.form = form;
