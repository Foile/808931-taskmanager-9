import {Board, EmptyBoard} from './board';
import {TaskList} from './task-list';
import {render, unrender} from '../utils';
import {LoadMore} from './load-more';
import {Sort} from './sort';
import {TaskController} from './task-controller';

const PAGE_COUNT = 8;

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._originTasks = [];
    Object.assign(this._originTasks, tasks);
    this._subscriptions = [];
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMore = new LoadMore();
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  _update() {
    Object.assign(this._tasks, this._originTasks);
    this._subscriptions = [];
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
        this._tasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderBoard(this._tasks.splice(0, PAGE_COUNT));
        break;
      case `date-down`:
        this._tasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderBoard(this._tasks.splice(0, PAGE_COUNT));
        break;
      case `default`:
        this._renderBoard(this._tasks.splice(0, PAGE_COUNT));
        break;
    }
  }

  _renderTask(data) {
    const taskController = new TaskController(this._taskList.getElement(), data, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _renderBoard(tasks) {
    const loadMore = () => this._renderBoard(this._tasks.splice(0, PAGE_COUNT));
    this._loadMore.getElement().addEventListener(`click`, loadMore);
    tasks.forEach((data) => {
      this._renderTask(data);
    });
    if (this._tasks.length === 0) {
      unrender(this._loadMore);
      return;
    }
    render(this._board.getElement(), this._loadMore.getElement());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;

    this._renderBoard(this._tasks);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  init() {
    render(this._board.getElement(), this._sort.getElement());
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._taskList.getElement());

    this._renderBoard(this._tasks.splice(0, PAGE_COUNT));
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
