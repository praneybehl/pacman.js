# Pacman simulator

My approach to the Pacman simulation problem in javascript. 


## Usage Instructions:

Prerequisites:

This simulator requires Node.js (v8+ preferred) and NPM to be installed on your system. For instructions on installing please visit: https://nodejs.org/en/

This project is written with EcmaScript2015(ES6/ES2015) so running directly with node with result in errors. To resolve that use the following:


```sh
$ npm install
$ npm start -- test/data/sample-data1.txt
```
Or to run directly from terminal, install babel-cli globally and run :
```sh
$ npm install -g babel-cli
$ babel-node babel-node index.js -- test/data/sample-data1.txt
```
Or to run using commandline and provide commands one line at a time, run:

```sh
$ npm start
```
P.S. To exit the simulator use "Ctrl + c"

## Pacman commands and valid format:

The simulator either accepts a .txt files, with one command per line or commandline input. 
The commands available are:

- **PLACE X, Y, DIRECTION (PLACE 0,1,NORTH):** Place the Pacman on the table.
- **MOVE:** Move the Pacman one unit in the direction it is facing
- **LEFT:** Turn the Pacman left
- **RIGHT:** Turn the Pacman right
- **REPORT:** Report the current position and direction of the Pacman (0,0,NORTH)

The table is a 5x5 grid, and any command that would result in the Pacman being off the table *will be ignored*.


## Tests

```sh
$ npm test
```

Test input files are available under ```test/data```. 

