import {menuMarkup} from './components/menu';
import {searchMarkup} from './components/search';
import {filterMarkup} from './components/filter';
import {cardMarkup} from './components/card';
import {cardEditMarkup} from './components/card-edit';
import {board} from './components/board';
import {loadMoreMarkup} from './components/load-more';

const getMarkup = (blockName, data) => {
  switch (blockName) {
    case `menu`: return menuMarkup(data.classes.join(` `));
    case `search`: return searchMarkup(data.classes.join(` `));
    case `filter`: return filterMarkup(data.classes.join(` `));
    case `card`: return cardMarkup(data.classes.join(` `));
    case `card-form`: return cardEditMarkup(data.classes.join(` `));
    case `load-more`: return loadMoreMarkup(data.classes.join(` `));
    case `board`: return board();
    default: throw new Error(`getMarkup: markup not found.`);
  }
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.main__control`);
render(headerElement, getMarkup(`menu`, {classes: [`control__btn-wrap`]}), `beforeEnd`);
render(mainElement, getMarkup(`search`, {classes: [`main__search`, `search`, `container`]}), `beforeEnd`);
render(mainElement, getMarkup(`filter`, {classes: [`main__filter`, `filter`, `container`]}), `beforeEnd`);

const cards = [{color: `black`, edit: true},
  {color: `blue`},
  {color: `yellow`},
  {color: `green`}
];

render(mainElement, getMarkup(`board`, {}), `beforeEnd`);
const boardElement = document.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

cards.forEach(({color, edit}) => {
  let classes = [`card`, `card--${color}`];
  if (edit) {
    classes.push(`card--edit`);
  }
  render(boardTasksElement, getMarkup(edit ? `card-form` : `card`, {classes}), `beforeEnd`);
});

render(boardElement, getMarkup(`load-more`, {classes: [`load-more`]}), `beforeEnd`);
