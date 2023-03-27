// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// const ip = "216.36.149.146";
// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("Error: ", error);
//     return;
//   }
//   console.log('Success! Coordinates are:', data);
// });

// const coords = { latitude: 49.848471, longitude: -99.9500904 };
// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("Error:", error);
//     return;
//   }
//   console.log('It worked! ISS upcoming flyover times are:', data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

const printPassTimes = (passTimes) => {
  passTimes.forEach((el) => {
    console.log(`Next pass at ${new Date(el.risetime)} for ${el.duration} seconds!`);
  });
};

module.exports = { printPassTimes };
