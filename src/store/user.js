import faker from 'faker';
import logger from '../utils/logger';
const DB_KEY = 'REACT_USERS';
let data = [];

function hasSupportLocalStorage() {
  var mod = 'modernizr';
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function initFakeData() {
  try {
    data = JSON.parse(localStorage.getItem(DB_KEY));
  } catch (error) {
    data = [];
  }
  if (data && data.length === 0) {
    for (let index = 0; index < 5; index++) {
      data.push({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: getRandomIntInclusive(20, 40),
        nickname: faker.internet.userName()
      });
    }
    hasSupportLocalStorage() &&
      localStorage.setItem(DB_KEY, JSON.stringify(data));
  }
}

function addUser(user, callback) {
  const newUser = { id: faker.random.uuid(), ...user };
  data.push(newUser);
  hasSupportLocalStorage() &&
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  callback && callback();
}

function removeUser(userId, callback) {
  const foundIndex = data.findIndex(item => item.id === userId);

  if (foundIndex !== -1) {
    data.splice(foundIndex, 1);
  }
  hasSupportLocalStorage() &&
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  callback && callback();
}

function updateUser(userId, user, callback) {
  const foundIndex = data.find(item => item.id === userId);
  if (foundIndex !== -1) {
    const updateData = Object.assign({}, data[foundIndex], user);
    data.splice(foundIndex, 1, updateData);
  }
  hasSupportLocalStorage() &&
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  callback && callback();
}

function getUsers() {
  logger.warn('getUsers', data);
  return data;
}

export { initFakeData, getUsers, addUser, updateUser, removeUser };
