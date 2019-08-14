export const cardEditMarkup = ({color, description, dueDate, repeatingDays, tags}) => `<article 
class="card card--${color} card--edit ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}
">
<form class="card__form" method="get">
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
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
    <div class="card__textarea-wrap">
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
      </label>
    </div>
    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          <button class="card__date-deadline-toggle" type="button">
            date: <span class="card__date-status">${dueDate ? `` : `no`}</span>
          </button>
          <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled=""`}>
            <label class="card__input-deadline-wrap">
              <input class="card__date" type="text" placeholder="${new Date(dueDate).toDateString()}" name="date">

            </label>
          </fieldset>
          <button class="card__repeat-toggle" type="button">
            repeat:<span class="card__repeat-status">${!Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `no` : ``}</span>
          </button>
          <fieldset class="card__repeat-days" ${!Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `disabled=""` : ``}>
            <div class="card__repeat-days-inner">
            ${(Object.entries(repeatingDays)).map((day) => `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day[0]}-1" name="repeat" value="${day[0]}" ${day[1] ? `checked=""` : ``}>
    <label class="card__repeat-day" for="repeat-${day[0]}-1">${day[0]}</label>`).join(``)}
            </div>
          </fieldset>
        </div>
        <div class="card__hashtag">
          <div class="card__hashtag-list">
          ${Array.from(tags).map((tag) =>`<span class="card__hashtag-inner">
          <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
          <p class="card__hashtag-name">
          #${tag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`).join(``)}</div>
          <label>
            <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
          </label>
        </div>
      </div>
      <div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          ${[`black`, `yellow`, `blue`, `green`, `pink`].map((clr) =>
    `<input type="radio" id="color-${clr}-1" class="card__color-input card__color-input--${clr} visually-hidden" name="color" value="${clr}" ${(color === clr) ? `checked=""` : ``}>
  <label for="color-${clr}-1" class="card__color card__color--${clr}">${clr}</label>`).join(``)}
        </div>
      </div>
    </div>
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  </div>
</form></article>`;
