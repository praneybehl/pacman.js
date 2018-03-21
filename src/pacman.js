'use strict';

/**
 * The max coordinates of the table
 * @type {{x: number, y: number}}
 */
const cordsMax = { x: 5, y: 5 };

/**
 * List of valid Directions.
 * @type {[*]}
 */
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

/**
 * Directions map to assist the robot to rotate.
 * @type {{north: {left: string, right: string}, east: {left: string, right: string}, south: {left: string, right: string}, west: {left: string, right: string}}}
 */
const map = {
	NORTH: {
		left: "WEST",
		right: "EAST"
	},
	EAST: {
		left: "NORTH",
		right: "SOUTH"
	},
	SOUTH: {
		left: "EAST",
		right: "WEST"
	},
	WEST: {
		left: "SOUTH",
		right: "NORTH"
	}
};

/**
 * Class Pacman
 * @constructor
 */
class Pacman {

	constructor() {
		this.x = null;
		this.y = null;
		this.f = null;
		this.isPlaced = false;
	}

	/**
	 * Place the Pacman on table to a valid coordinate.
	 * @param {Array} args - Arguments passed for placement of the Pacman.
	 * @returns {Pacman}
	 */
	place(args) {
		let [x, y, f] = args;

		 // Validate argument values.
		if(this.validateX(x) && this.validateY(y) && this.validateF(f) ) {
			// Modify Pacman position.
			this.isPlaced = true;
			this.x = x;
			this.y = y;
			this.f = f;
		}
		return this;
	}

	/**
	 * Moves the Pacman 1 unit in the direction it's facing.
	 * @returns {Pacman}
	 */
	move() {

		if(this.isPlaced) {
			switch (this.f) {
				case "NORTH":
					this.validateY(this.y + 1) ? this.y += 1 : "";
					break;

				case "EAST":
					this.validateX(this.x + 1) ? this.x += 1 : "";
					break;

				case "SOUTH":
					this.validateY(this.y - 1) ? this.y -= 1 : "";
					break;

				case "WEST":
					this.validateX(this.x - 1) ? this.x -= 1 : "";
					break;
			}
		}
		return this;
	}

	/**
	 * Rotates the Pacman left to it's current direction.
	 * @returns {Pacman}
	 */
	left() {

		if(this.isPlaced) {
			this.f = map[this.f].left;
		}
		return this;
	}

	/**
	 * Rotates the Pacman right to it's current direction.
	 * @returns {Pacman}
	 */
	right() {

		if(this.isPlaced) {
			this.f = map[this.f].right;
		}
		return this;
	}

	/**
	 * Output the Pacman's current x, y, and facing direction.
	 * @returns {Pacman}
	 */
	report() {

		if(this.isPlaced) {
			console.log(`Output: ${this.x},${this.y},${this.f}`);
		}
		return this;
	}

	/**
	 * Validate X coordinate value.
	 * @param {number} x - Value of X coordinate.
	 * @returns {boolean}
	 */
	validateX(x) {

		if(isNaN(x) || x < 0 || x > cordsMax.x) {
			!this.isPlaced ? console.log(`Please enter a valid X coordinate value. Hint: Use a number between 0 and ${cordsMax.x}`) : "";
			return false;
		} else return true;
	}

	/**
	 * Validate Y coordinate value.
	 * @param {number} y - Value of Y coordinate.
	 * @returns {boolean}
	 */
	validateY(y) {

		if(isNaN(y) || y < 0 || y > cordsMax.y) {
			!this.isPlaced ? console.log(`Please enter a valid Y coordinate value. Hint: Use a number between 0 and ${cordsMax.y}`) : "";
			return false;
		} else return true;
	}

	/**
	 * Validate Facing direction value.
	 * @param {string} f - Value of Facing direction.
	 * @returns {boolean}
	 */
	validateF(f) {

		if(directions.indexOf(f) === -1) {
			!this.isPlaced ? console.log("Please enter a valid facing direction. Hint: Use UPPERCASE") : "";
			return false;
		} else return true;
	}

	/**
	 * Process commands
	 * @param {Array} cmdList - List of commands data parsed from user input/file.
	 */
	process(cmdList) {

		cmdList.forEach(cmd => {
			cmd.args ? this[cmd.name](cmd.args)
				: this[cmd.name]();
		});
	}

}

export default Pacman;