'use strict';

const menuMarkup = (classes) =>`<section class="${classes}">
<input
  type="radio"
  name="control"
  id="control__new-task"
  class="control__input visually-hidden"
/>
<label for="control__new-task" class="control__label control__label--new-task"
  >+ ADD NEW TASK</label
>
<input
  type="radio"
  name="control"
  id="control__task"
  class="control__input visually-hidden"
  checked
/>
<label for="control__task" class="control__label">TASKS</label>
<input
  type="radio"
  name="control"
  id="control__statistic"
  class="control__input visually-hidden"
/>
<label for="control__statistic" class="control__label"
  >STATISTICS</label
>
</section>`;

const searchMarkup = (classes) => `<section class="${classes}"><input
type="text"
id="search__input"
class="search__input"
placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
/>
<label class="visually-hidden" for="search__input">Search</label></section>`;

const filterMarkup = (classes) => `<section class="${classes}"><input
type="radio"
id="filter__all"
class="filter__input visually-hidden"
name="filter"
checked
/>
<label for="filter__all" class="filter__label">
All <span class="filter__all-count">13</span></label
>
<input
type="radio"
id="filter__overdue"
class="filter__input visually-hidden"
name="filter"
disabled
/>
<label for="filter__overdue" class="filter__label"
>Overdue <span class="filter__overdue-count">0</span></label
>
<input
type="radio"
id="filter__today"
class="filter__input visually-hidden"
name="filter"
disabled
/>
<label for="filter__today" class="filter__label"
>Today <span class="filter__today-count">0</span></label
>
<input
type="radio"
id="filter__favorites"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__favorites" class="filter__label"
>Favorites <span class="filter__favorites-count">1</span></label
>
<input
type="radio"
id="filter__repeating"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__repeating" class="filter__label"
>Repeating <span class="filter__repeating-count">1</span></label
>
<input
type="radio"
id="filter__tags"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__tags" class="filter__label"
>Tags <span class="filter__tags-count">1</span></label
>
<input
type="radio"
id="filter__archive"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__archive" class="filter__label"
>Archive <span class="filter__archive-count">115</span></label
></section>`;

let getCardMarkup = (classes) => `<article class="${classes}">
 <div class="card__form">
   <div class="card__inner">
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
        edit
      </button>
      <button type="button" class="card__btn card__btn--archive">
        archive
      </button>
      <button
        type="button"
        class="card__btn card__btn--favorites card__btn--disabled">
        favorites
      </button>
    </div>
    <div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
    <div class="card__textarea-wrap">
      <p class="card__text">Example default task with default color.</p>
    </div>
    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          <div class="card__date-deadline">
            <p class="card__input-deadline-wrap">
              <span class="card__date">23 September</span>
              <span class="card__time">11:15 PM</span>
            </p>
          </div>
        </div>

        <div class="card__hashtag">
          <div class="card__hashtag-list">
            <span class="card__hashtag-inner">
              <span class="card__hashtag-name">
                #todo
              </span>
            </span>
            <span class="card__hashtag-inner">
              <span class="card__hashtag-name">
                #personal
              </span>
            </span>
            <span class="card__hashtag-inner">
              <span class="card__hashtag-name">
                #important
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</article>`;

const cardFormMarkup = (classes) => `<article class="${classes}"><form class="card__form" method="get">
  <div class="card__inner">
    <div class="card__control">
      <button type="button" class="card__btn card__btn--archive">
        archive
      </button>
      <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
        favorites
      </button>
    </div>
    <div class="card__color-bar">
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
    <div class="card__textarea-wrap">
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..." name="text">This is example of new task, you can add picture, set date and time, add tags.</textarea>
      </label>
    </div>
    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          <button class="card__date-deadline-toggle" type="button">
            date: <span class="card__date-status">no</span>
          </button>
          <fieldset class="card__date-deadline" disabled="">
            <label class="card__input-deadline-wrap">
              <input class="card__date" type="text" placeholder="23 September" name="date">
            </label>
          </fieldset>
          <button class="card__repeat-toggle" type="button">
            repeat:<span class="card__repeat-status">no</span>
          </button>
          <fieldset class="card__repeat-days" disabled="">
            <div class="card__repeat-days-inner">
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-1" name="repeat" value="mo">
              <label class="card__repeat-day" for="repeat-mo-1">mo</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-1" name="repeat" value="tu" checked="">
              <label class="card__repeat-day" for="repeat-tu-1">tu</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-1" name="repeat" value="we">
              <label class="card__repeat-day" for="repeat-we-1">we</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-1" name="repeat" value="th">
              <label class="card__repeat-day" for="repeat-th-1">th</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-1" name="repeat" value="fr" checked="">
              <label class="card__repeat-day" for="repeat-fr-1">fr</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-1">
              <label class="card__repeat-day" for="repeat-sa-1">sa</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-1" name="repeat" value="su" checked="">
              <label class="card__repeat-day" for="repeat-su-1">su</label>
            </div>
          </fieldset>
        </div>
        <div class="card__hashtag">
          <div class="card__hashtag-list"></div>
          <label>
            <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
          </label>
        </div>
      </div>
      <div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          <input type="radio" id="color-black-1" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" checked="">
          <label for="color-black-1" class="card__color card__color--black">black</label>
          <input type="radio" id="color-yellow-1" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow">
          <label for="color-yellow-1" class="card__color card__color--yellow">yellow</label>
          <input type="radio" id="color-blue-1" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
          <label for="color-blue-1" class="card__color card__color--blue">blue</label>
          <input type="radio" id="color-green-1" class="card__color-input card__color-input--green visually-hidden" name="color" value="green">
          <label for="color-green-1" class="card__color card__color--green">green</label>
          <input type="radio" id="color-pink-1" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
          <label for="color-pink-1" class="card__color card__color--pink">pink</label>
        </div>
      </div>
    </div>
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  </div>
</form></article>`;

const board = () => `<section class="board container">
<div class="board__filter-list">
  <a href="#" class="board__filter">SORT BY DEFAULT</a>
  <a href="#" class="board__filter">SORT BY DATE up</a>
  <a href="#" class="board__filter">SORT BY DATE down</a>
</div>

<div class="board__tasks">
</div>
</section>`;

const loadMoreMarkup = (classes) => `<button class="${classes}" type="button">load more</button>`;

const getMarkup = (blockName, data) => {
  switch (blockName) {
    case `menu`: return menuMarkup(data.classes.join(` `));
    case `search`: return searchMarkup(data.classes.join(` `));
    case `filter`: return filterMarkup(data.classes.join(` `));
    case `card`: return getCardMarkup(data.classes.join(` `));
    case `card-form`: return cardFormMarkup(data.classes.join(` `));
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
