# speed-auto-test

## To Do List
- [ ] FIX: when there is no file results.json it crashes (if there is no file, create it)
- [ ] FIX: when computer sleeps or closes, app stops
- [ ] FIX: make package.json script for running app
- [x] Add parameter for API token
- [x] Add parameter for time test interval
- [ ] Auto update API token / Catch BAD_TOKEN error
- [ ] Add testing framework + testcases
- [ ] Change error handling on each case / Make further error checks - testcases
- [ ] Find best way to write to file (sync vs async, append vs write)
- [ ] Add more command line arguments for options on fast API (https, urlCount, timeout, unit)
- [ ] Add command line argument for result file
- [ ] Webpack it, or other build tool



## Installation & Running

- Clone the repository in a folder:
```
git clone https://github.com/thanoskoutr/speed-auto-test.git
```
- In the cloned repository, download dependencies:
```
npm install
```
- Run the tool, with the appropriate parameters:
```
node app.js -i 12
```
- (TO BE FIXED) create a file named `results.json` in the directory, because it crashes if it's not found
```
touch results.json
```

## Info
The app utilizes the following already made fast.com API tool: https://github.com/branchard/fast-speedtest-api

### Token
Follow the instructions in @branchard repository to to find a new token if the default one is outdated, and pass it as a parameter:
```
app.js -i 12 -t YXNkZYXNkZasfJSASYXNkZ
```

### Timing Interval
You can choose the timing interval of your choice for when to take measurements.
**Minimum Value** is every 12 seconds.
**Recommended Value** is every 3600 seconds (1 hour).
```
app.js -i 3600
```

### Help
To see further help for each command line option, use the `-h` or `--help` flag.
```
app.js -h
```
