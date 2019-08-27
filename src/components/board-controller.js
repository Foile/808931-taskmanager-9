import {Task} from './task';
import {TaskEdit} from './task-edit';
import {Board, EmptyBoard} from './board';
import {TaskList} from './task-list';
import {render, unrender} from '../utils';
import {LoadMore} from './load-more';
import {Sort} from './sort';

const PAGE_COUNT = 8;

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._boardTasks = [];
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMore = new LoadMore();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderTasks(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderTasks(sortedByDateDownTasks);
        break;
      case `default`:
        this._tasks.forEach((task) => this._renderTask(task));
        break;
    }
  }
  _renderTask(data) {

    const task = new Task(data);
    const taskEdit = new TaskEdit(data);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
  .querySelector(`.card__btn--edit`)
  .addEventListener(`click`, () => {
    this._taskList.replaceChild(taskEdit.getElement(), task.getElement());
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
    this._taskList.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

    render(this._taskList.getElement(), task.getElement());
  }
  _renderTasks(tasks) {
    tasks.forEach((data) => {
      this._renderTask(data, this._taskList.getElement());
    });
    if (this._tasks.length === 0) {
      unrender(this._loadMore.getElement());
      return;
    }
  }

  _onLoadMoreClick() {
    this._renderTasks([...this._tasks.splice(0, PAGE_COUNT)])
    ;
  }
  init() {
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._sort.getElement());
    render(this._board.getElement(), this._taskList.getElement());
    render(this._board.getElement(), this._loadMore.getElement());
    this._loadMore.getElement().addEventListener(`click`, this._onLoadMoreClick);

    this._boardTasks = [...this._boardTasks, ...this._tasks.splice(0, PAGE_COUNT)];

    this._renderTasks(this._boardTasks);
    let activeTasks = this._boardTasks.filter((task) => task.isArchive);
    let emptyBoard = new EmptyBoard();
    if (activeTasks.length === 0) {
      unrender(this._board);
      render(this._container, emptyBoard.getElement());
    }

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
}
