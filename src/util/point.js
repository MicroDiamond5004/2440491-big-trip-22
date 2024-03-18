import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const EDIT_DATE_FORMAT = 'MM/DD/YY HH:mm';

function humanizeTravelDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function toEditTime(date) {
  return date ? dayjs(date).format(EDIT_DATE_FORMAT) : '';
}

function subtractDates(day, finishTime, startTime) {
  const currentDay = dayjs(day).toISOString().slice(0, 10);
  const currentStart = dayjs(startTime.length > 6 ? startTime : (`${currentDay}T${startTime}`));
  const currentFinish = dayjs(finishTime.length > 6 ? finishTime : (`${currentDay}T${finishTime}`));
  let hourDiff = currentFinish.diff(currentStart, 'h');
  let minuteDiff = currentFinish.diff(currentStart, 'm');
  let dayDiff = currentFinish.diff(currentStart, 'd');
  if (hourDiff >= 24) {
    dayDiff = `${dayDiff}D`;
    hourDiff = hourDiff - (60 * dayDiff);
  }
  if(hourDiff > 0) {
    if (hourDiff < 10) {
      hourDiff = `0${hourDiff}`;
    }
    minuteDiff = minuteDiff - (60 * hourDiff);
    if (minuteDiff === 0) {
      minuteDiff = `0${minuteDiff}`;
    }
  }
  return `${(dayDiff ? `${dayDiff}D ` : '') + (hourDiff ? `${hourDiff}H ` : '') + (minuteDiff ? `${minuteDiff}M` : '')}`;
}

function getWeightForNullProperty(propertyA, propertyB) {
  if (propertyA === null && propertyB === null) {
    return 0;
  }

  if (propertyA === null) {
    return 1;
  }

  if (propertyB === null) {
    return -1;
  }

  return null;
}

function sortPointByDay(pointA, pointB) {
  const weight = getWeightForNullProperty(pointA, pointB);
  return weight ?? dayjs(pointA.day).diff(dayjs(pointB.day));
}

function sortPointByTime(pointA, pointB) {
  const weight = getWeightForNullProperty(pointA, pointB);
  return weight ?? dayjs(`2024-02-10T${pointA.startTime}`).diff(dayjs(`2024-02-10T${pointB.startTime}`));
}

function sortPointByPrice(pointA, pointB) {
  const weight = getWeightForNullProperty(pointA, pointB);
  return weight ?? pointA.price - pointB.price;
}

export {humanizeTravelDate, toEditTime, subtractDates, sortPointByDay, sortPointByTime, sortPointByPrice};
