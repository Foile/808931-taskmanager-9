import {AbstractComponent} from './abstract-component';

export class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}

export class EmptyBoard extends AbstractComponent {
  getTemplate() {
    return `<section class="board container">
<p class="board__no-tasks">
  Congratulations, all tasks were completed! To create a new click on
  «add new task» button.
</p>
</section>`;
  }
}
