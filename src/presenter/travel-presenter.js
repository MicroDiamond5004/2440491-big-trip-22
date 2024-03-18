import SortView from '../view/form-sort-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NoPointView from '../view/no-point-view.js';
import FilterView from '../view/form-filter-view.js';
import PointListView from '../view/points-list-view.js';
import { updateItem } from '../util/common.js';
import { sortPointByDay, sortPointByPrice, sortPointByTime } from '../util/point.js';
import { SortType } from '../const.js';

export default class TravelPresenter {
  #siteMain = document.querySelector('.trip-events');
  #filterSection = document.querySelector('.trip-controls__filters');

  #travelContainer = null;
  #eventModel = null;

  #sortComponent = null;
  #noPointsComponent = new NoPointView({filterText: 'Everything'});
  #pointListView = new PointListView();
  #filterView = new FilterView();

  #travelEvents = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTravelEvents = [];

  constructor(eventModel) {
    this.#eventModel = eventModel;
  }

  init() {
    render(this.#pointListView, this.#siteMain);
    render(this.#filterView, this.#filterSection);
    this.#travelEvents = [...this.#eventModel.events];
    this.#sourcedTravelEvents = [...this.#eventModel.events];
    this.#travelContainer = document.querySelector('.trip-events__list');
    this.#renderList();
  }

  /** Функция для отрисовки всех компонентов */
  #renderList() {
    this.#renderSort();
    this.#renderPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#siteMain, RenderPosition.AFTERBEGIN);
  }

  #handlePointChange = (updatedPoint) => {
    this.#travelEvents = updateItem(this.#travelEvents, updatedPoint);
    this.#sourcedTravelEvents = updateItem(this.#sourcedTravelEvents, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((el) => el.resetView());
  };

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#travelContainer);
  }

  #renderPoints() {
    if (this.#travelEvents === null) {
      this.#renderNoPoints();
      return;
    }
    this.#travelEvents.forEach((el) => this.#renderPoint(el));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      travelContainer: this.#travelContainer,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      clearEvent: this.#clearEventById
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#travelEvents.sort(sortPointByDay);
        break;
      case SortType.PRICE:
        this.#travelEvents.sort(sortPointByPrice);
        break;
      case SortType.TIME:
        this.#travelEvents.sort(sortPointByTime);
        break;
      default:
        this.#travelEvents = [...this.#sourcedTravelEvents];
    }

    this.#currentSortType = sortType;
  }

  #clearList() {
    this.#pointPresenters.forEach((el) => el.destroy());
  }

  #clearEventById = (id) => {
    this.#pointPresenters.forEach((value, key) => {
      if(key === id) {
        this.#pointPresenters.delete(key);
      }
    });
    this.#travelEvents = this.#travelEvents.filter((el) => el.id !== id);
    this.#sourcedTravelEvents = [...this.#travelEvents];
    if(this.#travelEvents.length === 0) {
      console.log(this.#travelEvents);
      this.#renderNoPoints();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderPoints();
  };
}
