import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filters} from './components/filter';

import {getTask, calcFilters} from './data';
import {render, Position} from './utils';
import {BoardController} from './components/board-controller';

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.main__control`);

render(headerElement, new Menu().getElement());
render(mainElement, new Search().getElement());
const board = new BoardController(mainElement, [...getTask(42)]);


const filters = new Filters(calcFilters([]));
render(mainElement, filters.getElement(), Position.BEFOREEND);
board.init();
