const FastSpeedtest = require("fast-speedtest-api");
const fs = require('fs');
const stream = require('stream');
const path = require('path');


function getCurrentTime() {
  const date_ob = new Date();
  // adjust 0 before single digit date
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();

  const time = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;

  return time;
}

let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    // token: "a",
    verbose: true, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
});


const results = []
const resultsJSON = []

getResults = (callback) => {
  speedtest.getSpeed().then(s => {
      // console.log(`Speed: ${s} Mbps`);
      callback(null, s);
  }).catch(e => {
      // console.error(e);
      callback(e.message);
  });
}

const intrvalID = setInterval(() => {

  getResults((err, res) => {
    // ADD --> Add extra error handling for BAD_TOKEN (maybe update it)
    if (err) {
      console.log("ERROR: ", err);
      console.log("I DIDNT FIND THE TOKEN ERROR");
      clearInterval(intrvalID);
    }
    else {
      console.log("No errors yet");

      currentTime = getCurrentTime();
      const resObj = {
        Timestamp: currentTime,
        Speed: res
      };

      // Save object to list
      results.push(resObj);
      console.error(results);

      // Convert and save JSON to list
      const json = JSON.stringify(results);
      console.log(json);

      // Write whole JSON each time --> FIX: implement with fs.createWriteStream
      fs.writeFile('results.json', json, (err) => {
        if (err) {
          console.log("ERROR: ", err);
          clearInterval(intrvalID);
        }
      });
    }
  });

}, 12000);
