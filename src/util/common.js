function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateItem(items, update) {
  return items.map((el) => el.id === update.id ? update : el);
}

function isEmpty(el) {
  if (el !== '' && el !== null) {
    return false;
  }
  return true;
}

function addActionByToggleObject(cb, obj) {
  let i = 0;
  let changeTtoF = 0;
  let changeFtoT = 0;
  let countFalse = 0;
  const prevEmptys = obj;
  while (i < Object.keys(prevEmptys).length) {
    if (prevEmptys[Object.keys(prevEmptys)[i]] !== prevEmptys[Object.keys(prevEmptys)[i + 1]]) {
      if (!prevEmptys[Object.keys(prevEmptys)[i]]) {
        changeTtoF++;
      } else {
        changeFtoT++;
      }
    } else {
      if (!prevEmptys[Object.keys(prevEmptys)[i]]) {
        countFalse++;
      }
    }
    i += 2;
  }
  if (changeFtoT > 0 || (countFalse > 0 && changeTtoF > 0)) {
    cb();
  }
}

export{getRandomElement, updateItem, isEmpty, addActionByToggleObject};
