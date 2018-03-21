'use strict';

import * as fs from "fs";

/**
 * InputReader Class
 * @constructor
 */
class InputReader {

	/**
	 * Read Input File.
	 * @param {string} fileName - Path of the .txt file with Pacman commands.
	 * @param {Function} onFile - Callback function.
	 */
	readFile(fileName, onFile) {

		this.validateFile(fileName, (err, validatedFile) => {
			if(err) {
				onFile(err);
				return false;
			}

			fs.readFile(validatedFile, { encoding: 'utf-8' }, function(err, data) {
				if (err) {
					onFile(new Error('File doesn\'t exist or cannot be accessed'));
					return false;
				}

				// Check if content of the file is empty.
				if (!data.length) {
					onFile(new Error('File content cannot be empty'));
					return false;
				}

				onFile(null, data);
			});
		});

	}

	/**
	 * Validate Input File.
	 * @param {string} file - Filename to validate.
	 * @param {Function} onValidate - Callback function.
	 */
	validateFile(file, onValidate) {
		const split = file.split("."),
			length = split.length;

		// Input file must have an extension
		if (length === 1 && split[0] === file) {
			onValidate(new Error('Program requires a valid .txt file for input data'));
			return false;
		}

		// Force .txt files as only input file type.
		if (split[length - 1] !== 'txt') {
			onValidate(new Error('Simulator only accepts .txt files'));
			return false;
		}

		onValidate(null, file);

	}

	/**
	 * Parse Input from file
	 * @param {string} rawCmds - Raw commands for Pacman from the input file.
	 * @param {Function} - Callback function return error or an array of parsed command objects to be processed
	 */
	parseInputCommands(rawCmds, cb) {

		// Check if no commands are passed
		if (!rawCmds.length) {
			cb(new Error('Sorry, no commands were passed'));
			return false;
		}

		const parsedArray = rawCmds
			.split('\n')
			.reduce((cmdList, rawCmd) => {
				var parsedCmd = this.parseRawCommand(rawCmd);
				parsedCmd ? cmdList.push(parsedCmd) : "";
				return cmdList;
			}, []);

		cb(null, parsedArray);
	}

	/**
	 * Parse a raw command.
	 * @param {String} rawCmd - Raw command to be passed.
	 * @returns {Object} - Parsed command as object.
	 */
	parseRawCommand(rawCmd) {

		let parsedCommand;
		const cmd = rawCmd.split(" ");

		// Check for place command.
		if(cmd.length > 1 && cmd[0] === "PLACE") {
			parsedCommand = {
				name: cmd[0].toLowerCase(),
				args: cmd[1].split(',')
			};
			parsedCommand.args[0] = parseInt(parsedCommand.args[0]);
			parsedCommand.args[1] = parseInt(parsedCommand.args[1]);
		}else {
			parsedCommand = {
				name: cmd[0].toLowerCase()
			};
		}
		return parsedCommand;
	}
}

export default InputReader;