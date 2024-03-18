import { mockEvents, mockOffers} from '../mock/event.js';
import { getRandomElement } from '../util/common.js';
import { nanoid } from 'nanoid';

const EVENT_COUNT = 12;

export default class EventModel {
  #getRandomEvent() {
    return {id: nanoid(), ...getRandomElement(mockEvents)};
  }

  createEventModel = () => {
    const currentEvent = this.#getRandomEvent();
    const currentOffers = mockOffers.filter((el) => {
      const currentOffersArr = currentEvent.offersId;
      if(currentOffersArr) {
        return currentOffersArr.indexOf(el.id) !== -1;
      }
    });
    return {...currentEvent, currentOffers};
  };

  #events = Array.from({length: EVENT_COUNT}, this.createEventModel);

  get events() {
    return this.#events;
  }
}
