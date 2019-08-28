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
    this._originTasks = [];
    Object.assign(this._originTasks, tasks);
    this._boardTasks = [];
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMore = new LoadMore();
  }

  _update() {
    Object.assign(this._tasks, this._originTasks);
    this._boardTasks = [];
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    this._update();
    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._originTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderCards(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._originTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderCards(sortedByDateDownTasks);
        break;
      case `default`:
        this._originTasks.forEach((task) => this._renderTask(task));
        break;
    }
  }

  _renderTask(data) {
    const task = new Task(data);
    const taskEdit = new TaskEdit(data);
    if (this._boardTasks.includes(data)) {
      return;
    }
    this._boardTasks.push(data);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
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
      this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList.getElement(), task.getElement());
  }
  _renderCards(tasks) {
    const loadMore = () => this._renderCards(this._tasks.splice(0, PAGE_COUNT));
    this._loadMore.getElement().addEventListener(`click`, loadMore);
    tasks.forEach((data) => {
      this._renderTask(data, this._taskList.getElement());
    });
    if (this._tasks.length === 0) {
      unrender(this._loadMore);
      return;
    }
    render(this._board.getElement(), this._loadMore.getElement());
  }

  init() {
    render(this._board.getElement(), this._sort.getElement());
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._taskList.getElement());

    this._renderCards(this._tasks.splice(0, PAGE_COUNT));
    let activeTasks = this._tasks.filter((task) => task.isArchive);
    let emptyBoard = new EmptyBoard();
    if (activeTasks.length === 0) {
      unrender(this._board);
      render(this._container, emptyBoard.getElement());
    }

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
}
