const request = require('request-promise-native');
const urlIP = 'https://api.ipify.org?format=json';
const urlCoords = 'http://ipwho.is/';
const urlISS = 'https://iss-flyover.herokuapp.com/json/?';

const fetchMyIP = () => {
  return request(urlIP);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`${urlCoords}${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`${urlISS}lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
