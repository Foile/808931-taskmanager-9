import {menuMarkup} from './components/menu';
import {searchMarkup} from './components/search';
import {filterMarkup} from './components/filter';
import {cardMarkup} from './components/card';
import {cardEditMarkup} from './components/card-edit';
import {board} from './components/board';
import {loadMoreMarkup} from './components/load-more';
import {getTask, calcFilters} from './data';

const getMarkup = (blockName, data) => {
  switch (blockName) {
    case `menu`: return menuMarkup(data.classes.join(` `));
    case `search`: return searchMarkup(data.classes.join(` `));
    case `filter`: return filterMarkup(data);
    case `card`: return cardMarkup(data);
    case `card-form`: return cardEditMarkup(data);
    case `load-more`: return loadMoreMarkup(data.classes.join(` `));
    case `board`: return board();
    default: throw new Error(`getMarkup: markup not found.`);
  }
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

let editTask = getTask();
editTask.edit = true;
const cards = [editTask, getTask(), getTask(), getTask(), getTask(), getTask(), getTask()];
const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.main__control`);

render(headerElement, getMarkup(`menu`, {classes: [`control__btn-wrap`]}), `beforeEnd`);
render(mainElement, getMarkup(`search`, {classes: [`main__search`, `search`, `container`]}), `beforeEnd`);
const filters = calcFilters(cards);
render(mainElement, getMarkup(`filter`, filters), `beforeEnd`);

render(mainElement, getMarkup(`board`, {}), `beforeEnd`);
const boardElement = document.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

cards.forEach((task) => {
  render(boardTasksElement, getMarkup(task.edit ? `card-form` : `card`, task), `beforeEnd`);
});

render(boardElement, getMarkup(`load-more`, {classes: [`load-more`]}), `beforeEnd`);
