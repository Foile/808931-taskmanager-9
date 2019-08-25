import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filters} from './components/filter';
import {Task} from './components/task';
import {TaskEdit} from './components/task-edit';
import {Board, EmptyBoard} from './components/board';
import {LoadMore} from './components/load-more';
import {getTask, calcFilters} from './data';
import {render, unrender} from './utils';

const loadMore = () => renderCards([...getTask(8)]);
const loadMoreElement = new LoadMore();
loadMoreElement.getElement().addEventListener(`click`, loadMore);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.main__control`);

render(headerElement, new Menu().getElement());
render(mainElement, new Search().getElement());

const filters = new Filters(calcFilters([]));
render(mainElement, filters.getElement());

const board = new Board();
render(mainElement, board.getElement());
const tasksContainer = board.getElement().querySelector(`.board__tasks`);
render(board.getElement(), loadMoreElement.getElement());

let boardTasks = [];

const renderCards = (cards) => {
  cards.forEach((data) => {

    const task = new Task(data);
    const taskEdit = new TaskEdit(data);
    boardTasks.push({task, taskEdit});

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

    render(tasksContainer, task.getElement());

  });
  if (boardTasks.length > 42) {
    unrender(loadMoreElement);
    return;
  }
};

renderCards([...getTask(7)]);
let activeTasks = boardTasks.filter(({task}) => task._isArchive);
let emptyBoard = new EmptyBoard();
if (activeTasks.length === 0) {
  unrender(board);
  render(mainElement, emptyBoard.getElement());
}

