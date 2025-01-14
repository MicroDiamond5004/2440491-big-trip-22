import { createElement } from '../render';
import { humanizeTravelDate, subtractDates } from '../util';

function createNewPoint(event) {
  const travelPoint = event[0];
  const pointOffers = event[1];
  const {day, type, place, startTime, finishTime, price, isFavourite} = travelPoint;
  const offerEls = [];
  if (pointOffers !== 0) {
    pointOffers.forEach((el) => {
      offerEls.push(`<li class="event__offer">
        <span class="event__offer-title">${el[0].text}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${el[0].price}</span>
      </li>`);
    });
  }

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${humanizeTravelDate(day)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type[0].toUpperCase() + type.slice(1)} ${place[0].toUpperCase() + place.slice(1)}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${new Date(finishTime)}">${finishTime}</time>
      </p>
      <p class="event__duration">${subtractDates(day, finishTime, startTime)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offerEls.join('')}
    </ul>
    <button class="event__favorite-btn ${isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
}

export default class NewPointView {
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createNewPoint(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

