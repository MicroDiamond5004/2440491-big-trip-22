import { createElement } from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" data-sort-type='${SortType.DAY}' type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" data-sort-type='${SortType.EVENT}' name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" data-sort-type='${SortType.TIME}' name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" data-sort-type='${SortType.PRICE}' name="trip-sort" value="sort-price" >
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" data-sort-type='${SortType.OFFERS}' name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
  </form>`);
}

export default class SortView extends AbstractView {
  #element = null;

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
