import {AbstractComponent} from './abstract-component';

export class LoadMore extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

