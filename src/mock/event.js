import { EVENTS } from '../const.js';
import { getRandomElement } from '../util/common.js';


const mockEvents = [{
  place: 'Monaco',
  day: new Date('2024-03-02'),
  type: getRandomElement(EVENTS),
  startTime: '10:30',
  finishTime: '11:50',
  price: 20,
  offersId: [2, 3, 1],
  offersCheckedId: [2, 3],
  isFavorite: false,
  destination: {
    hasDestination: true,
    text: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photo: [1, 3, 5]
  }
},
{
  place: 'Italy',
  day: new Date('2024-04-14'),
  type: getRandomElement(EVENTS),
  startTime: '8:30',
  finishTime: '10:30',
  price: 6320,
  offersId: [3, 4, 2],
  offersCheckedId: [3, 4],
  isFavorite: true,
  destination: {
    hasDestination: true,
    text: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photo: [1, 5, 2]
  }
},
{
  place: 'Germany',
  day: new Date('2024-04-14'),
  type: getRandomElement(EVENTS),
  startTime: '12:00',
  finishTime: '18:20',
  price: 6320,
  offersId: [5, 6, 2, 3,],
  offersCheckedId: [5, 6],
  isFavorite: false,
  destination: {
    hasDestination: false,
    text: '',
    photo: 0
  }
},
{
  place: 'Chamonix',
  day: new Date('2024-08-18'),
  type: getRandomElement(EVENTS),
  startTime: '10:00',
  finishTime: '22:20',
  price: 785,
  isFavorite: false,
  offersId: [1, 3, 5, 7],
  destination: {
    hasDestination: false,
    text: '',
    photo: [1, 2, 5, 3, 4]
  }
}];

const mockOffers = [{
  id: 1,
  text: 'Rent a car',
  price: 200,
  isChecked: true
},
{
  id: 2,
  text: 'Add breakfast',
  price: 50,
  isChecked: false
},
{
  id: 3,
  text: 'Book tickets',
  price: 40,
  isChecked: true
},
{
  id: 4,
  text: 'Lunch in city',
  price: 70,
  isChecked: false
},
{
  id: 5,
  text: 'Add luggage',
  price: 100,
  isChecked: false
},
{
  id: 6,
  text: 'Switch to comfort',
  price: 100,
  isChecked: false
},
{
  id: 7,
  text: 'Add meal',
  price: 100,
  isChecked: false
},
{
  id: 8,
  text: 'Book hotel',
  price: 500,
  isChecked: false
}];


export {mockEvents, mockOffers};
