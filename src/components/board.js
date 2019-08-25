import {AbstractComponent} from './abstract-component';

export class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>
    
    <div class="board__tasks">
    </div>
    </section>`;
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
