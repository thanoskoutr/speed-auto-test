const FastSpeedtest = require("fast-speedtest-api");
const fs = require('fs');
const jsonfile = require('jsonfile');
const yargs = require('yargs');

resultsFile = 'results.json';

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

getResults = (callback) => {
  speedtest.getSpeed().then(s => {
      // console.log(`Speed: ${s} Mbps`);
      callback(null, s);
  }).catch(e => {
      // console.error(e);
      callback(e.message);
  });
}

let testingInterval = 12000;
let tokenAPI = "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm"
let verboseOption = false;

const argv = yargs
  .usage('Usage: $0 -option value \n e.g $0 -i 12 -t YXNkZYXNkZasfJSASYXNkZ')
  .option('interval', {
    alias: 'i',
    type: 'number',
    description: 'Choose the timing interval of your choice (in sec)'
  })
  .option('token', {
    alias: 't',
    type: 'string',
    describe: 'Add the fast.com required API token (If default is broken)'
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    describe: 'Run with verbose logging'
  })
  .demandOption(['interval'], 'Please provide a valid timing interval. \n Minimum value: 12 sec \n Recommended value: 3600 sec')
  .help()
  .alias('help', 'h')
  .epilog('copyleft 2020')
  .argv;

// console.log(argv);

if (argv.i) {
  if (argv.i * 1000 < 12000) {
    console.log("Testing Interval can not be less than 12 seconds.");
    return;
    // throw new Error("Testing Interval can not be less than 12 seconds.");
  }
  testingInterval = argv.i * 1000;
  console.log("Chosen interval:", argv.i, "sec");
}

if (argv.t) {
  tokenAPI = argv.t;
  console.log("Chosen token:", argv.t);
}

if (argv.v) {
  verboseOption = true;
  console.log("Chosen verbose output:", argv.v);
}


let speedtest = new FastSpeedtest({
    token: tokenAPI, // required
    // token: "a",
    verbose: verboseOption, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
});


const intervalID = setInterval(() => {

  getResults((err, speedResult) => {
    if (err) {
      console.log("ERROR: ", err);
      clearInterval(intervalID);
    }
    else {

      currentTime = getCurrentTime();

      const resObj = {
        Timestamp: currentTime,
        Speed: speedResult + ' Mbps'
      };

      // Open JSON file and append new value
      fs.readFile(resultsFile, 'utf8', (err, data) => {
        if (err) {
          console.log("ERROR: ", err);
          clearInterval(intervalID);
        }
        else {
          // If empty file, JSON.parse crashes
          if (data == "") {
            objFromFile = []
          }
          else {
            objFromFile = JSON.parse(data);
          }

          objFromFile.push(resObj);
          jsonToFile = JSON.stringify(objFromFile, null, 2);

          console.log(resObj);

          if (verboseOption) {
            console.log(objFromFile);
          }

          fs.writeFile(resultsFile, jsonToFile, (err) => {
            if (err) {
              console.log("ERROR: ", err);
              clearInterval(intervalID);
            }
          });
        }
      });

    }
  });

}, testingInterval);
