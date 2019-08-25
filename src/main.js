import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filters} from './components/filter';
import {Task} from './components/task';
import {TaskEdit} from './components/task-edit';
import {Board} from './components/board';
import {LoadMore} from './components/load-more';
import {getTask, calcFilters} from './data';
import {Position, render, unrender} from './utils';

let allCards = [];

const loadMore = () => renderCards([...getTask(8)]);
const loadMoreElement = new LoadMore().getElement();
loadMoreElement.addEventListener(`click`, loadMore);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.main__control`);

render(headerElement, new Menu().getElement(), Position.BEFOREEND);
render(mainElement, new Search().getElement(), Position.BEFOREEND);

const filters = calcFilters(allCards);
render(mainElement, new Filters(filters).getElement(), Position.BEFOREEND);

const boardElement = new Board().getElement();
render(mainElement, boardElement, Position.BEFOREEND);
const tasksContainer = boardElement.querySelector(`.board__tasks`);
render(boardElement, loadMoreElement, Position.BEFOREEND);

const renderCards = (cards) => {
  cards.forEach((data) => {

    const task = new Task(data);
    const taskEdit = new TaskEdit(data);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tasksContainer, task.getElement(), Position.BEFOREEND);

  });
  allCards = [...allCards, ...cards];
  if (allCards.length > 42) {
    unrender(loadMoreElement);
    return;
  }
};

renderCards([...getTask(7)]);
