import {AbstractComponent} from './abstract-component';

export class LoadMore extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}


export const loadMoreMarkup = (classes) => `<button class="${classes}" type="button">load more</button>`;
