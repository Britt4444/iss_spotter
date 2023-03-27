/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const urlIP = 'https://api.ipify.org?format=json';
const urlCoords = 'http://ipwho.is/';
const urlISS = 'https://iss-flyover.herokuapp.com/json/?'; //?lat=49.848471&lon=-99.9500904

const fetchMyIP = function(callback) {
  request(urlIP, (error, response, body) => {
    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`${urlCoords}${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }
    const latitude = data.latitude;
    const longitude = data.longitude;
    const coords = { latitude, longitude };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`${urlISS}lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS fly over times`), null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };