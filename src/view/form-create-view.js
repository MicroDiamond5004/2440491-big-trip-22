import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { toEditTime } from '../util/point.js';
import { addActionByToggleObject, isEmpty } from '../util/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.css';

function createOffersTemplate(event) {
  const offerEls = [];
  event.currentOffers.forEach((el) => {
    const uniqueId = el.text.split(' ').at(-1);
    let isChecked = '';
    if (event.offersCheckedId) {
      isChecked = (event.offersCheckedId).indexOf(el.id) !== -1 ? 'checked' : '';
    }
    offerEls.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${uniqueId}" type="checkbox" name="event-offer-${uniqueId}" ${ isChecked } >
    <label class="event__offer-label" for="event-offer-${uniqueId}">
      <span class="event__offer-title">${el.text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </label>
  </div>`);
  });
  return offerEls.join('');
}

function createEventTemplate(event) {
  const {day, place, destination, startTime, finishTime, price} = event;
  const type = event.isChangeEvent ? event.isChangeEvent : event.type;
  const photosEls = [];
  const isDisableSubmit = event.empty ? true : null;
  if (destination.photo !== 0) {
    destination.photo.forEach((el) => {
      photosEls.push(`<img class="event__photo" src="img/photos/${el}.jpg" alt="Event photo">`);
    });
  }
  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type[0].toUpperCase() + type.slice(1)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${place ? place[0].toUpperCase() + place.slice(1) : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${toEditTime(day).slice(0, -5) + startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${toEditTime(day).slice(0, -5) + finishTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisableSubmit ? 'disabled' : ''}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${createOffersTemplate(event)}
        </div>
      </section>

      ${destination.hasDestination ? (`<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.text}</p>

      ${photosEls ? (`<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosEls.join('')}
        </div>
      </div>`) : ''}
    </section>`) : ''}
    </section>
  </form>
</li>`);
}

export default class EventFormView extends AbstractStatefulView {
  #event = null;
  #destroy = null;
  #callback = null;
  #datepicker = null;
  #prevEmptys = {
    prev1: false,
    prev11: false,
    prev2: false,
    prev22: false
  };

  constructor({event, callback, destroy}) {
    super();
    this.#event = event;
    this._setState(EventFormView.parseFormToState(event));
    this.#callback = callback;
    this.#destroy = destroy;
    this._restoreHandlers();
  }

  get template() {
    return createEventTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#OnSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onResetButton);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#OnChangeEvent);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#onEditPlace);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onEditPrice);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteButton);
    this.#setDatepicker();
  }

  static parseFormToState(form) {
    return {...form, isChangeEvent: this._state};
  }

  static parseStateToForm(state) {
    const form = {...state};

    if (!form.isChangeEvent) {
      form.isChangeEvent = null;
    }

    if (!form.empty){
      form.empty = null;
    }

    delete form.isChangeEvent;
    delete form.empty;
    return form;
  }

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({
      day: userDate,
    });
  };

  #OnSubmit = (evt) => {
    evt.preventDefault();
    this.#callback(EventFormView.parseStateToForm(this._state));
  };

  #changeEmptyState(field) {
    addActionByToggleObject(() => this.updateElement({empty: isEmpty(field)}), this.#prevEmptys);
  }

  #setDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input--time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H-i',
        defaultDate: this._state.day,
        onChange: this.#dueDateChangeHandler,
      },
    );
  }

  #onEditPlace = (evt) => {
    this.#prevEmptys.prev1 = isEmpty(evt.target.value);
    evt.preventDefault();
    this._setState({
      place: evt.target.value
    });
    this.#changeEmptyState(evt.target.value);
    this.#prevEmptys.prev11 = this.#prevEmptys.prev1;
  };

  #onEditPrice = (evt) => {
    this.#prevEmptys.prev2 = isEmpty(evt.target.value);
    evt.preventDefault();
    this._setState({
      price: evt.target.value
    });
    this.#changeEmptyState(evt.target.value);
    this.#prevEmptys.prev22 = this.#prevEmptys.prev2;
  };

  #OnChangeEvent = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      isChangeEvent: evt.target.value
    });
  };

  #onDeleteButton = (evt) => {
    evt.preventDefault();
    this.#destroy();
  };

  #onResetButton = (evt) => {
    evt.preventDefault();
    this.reset(this.#event);
    this.#callback(EventFormView.parseStateToForm(this.#event));
  };

  reset(event) {
    this.updateElement(
      EventFormView.parseStateToForm(event)
    );
  }
}
