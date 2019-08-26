import {Task} from './task';
import {TaskEdit} from './task-edit';
import {Board, EmptyBoard} from './board';
import {render, unrender} from '../utils';
import {LoadMore} from './load-more';

const PAGE_COUNT = 8;

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._boardTasks = [];
  }
  renderTask(data, tasksContainer) {

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

    render(tasksContainer, task.getElement());
  }

  init() {
    const loadMore = () => renderCards([...this._tasks.splice(0, PAGE_COUNT)]);
    const loadMoreElement = new LoadMore();
    loadMoreElement.getElement().addEventListener(`click`, loadMore);

    const board = new Board();
    render(this._container, board.getElement());
    const tasksContainer = board.getElement().querySelector(`.board__tasks`);
    render(board.getElement(), loadMoreElement.getElement());

    this._boardTasks = [...this._boardTasks, ...this._tasks.splice(0, PAGE_COUNT)];
    const renderCards = (tasks) => {
      tasks.forEach((data) => {
        this.renderTask(data, tasksContainer);
      });
      if (this._tasks.length === 0) {
        unrender(loadMoreElement);
        return;
      }
    };

    renderCards(this._boardTasks);
    let activeTasks = this._boardTasks.filter((task) => task.isArchive);
    let emptyBoard = new EmptyBoard();
    if (activeTasks.length === 0) {
      unrender(board);
      render(this._container, emptyBoard.getElement());
    }
  }
}
