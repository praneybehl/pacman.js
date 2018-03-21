import Pacman from "./src/pacman";
import InputReader from "./src/input-reader";
import * as readline from "readline";

const pacman = new Pacman(),
	inputReader = new InputReader();


const inputFile = process.argv[2] || null;

if(inputFile) {
	inputReader.readFile(inputFile, (err, rawCommands) => {
		err ? console.log(err) : "";

		inputReader.parseInputCommands(rawCommands, (err, parsedArray) => {
			err ? console.log(err) : "";

			pacman.process(parsedArray);
		});
	});
}else {
	console.log(`No file passed. Starting commandline interface`);
	console.log(`Please enter command for Pacman`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on('line', (input) => {
		pacman.process([inputReader.parseRawCommand(input)]);
	});
}