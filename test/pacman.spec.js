'use strict';


import Pacman from "../src/pacman";
import { expect, should } from 'chai';
import sinon from "sinon";

should();

describe("Pacman", () => {

	let pacman;

	beforeEach(() => {
		pacman = new Pacman();
	});

	/**
	 * Place pacman function tests.
	 */
	it("should ignore all commands if not placed on the table.", () => {
		pacman.move();
		pacman.left();
		pacman.right();
		pacman.report();
		expect(pacman.isPlaced).to.be.false;
		expect(pacman.x).to.equal(null);
		expect(pacman.y).to.equal(null);
		expect(pacman.f).to.equal(null);
	});

	it("should ignore place commands that are not valid coordinate on the table.", () => {
		pacman.place([2,4,"NORTH"]);
		pacman.place([8,4,"WEST"]);
		expect(pacman.x).to.equal(2);
		expect(pacman.y).to.equal(4);
		expect(pacman.f).to.equal("NORTH");
	});

	it("should be placed on valid coordinate on the table", () => {
		pacman.place([2,4,"NORTH"]);
		expect(pacman.isPlaced).to.be.true;
	});

	it("should place the pacman to another valid positions if required.", () => {
		pacman.place([0,0,"WEST"]);
		pacman.move();
		pacman.place([2,2,"SOUTH"]);
		expect(pacman.x).to.equal(2);
		expect(pacman.y).to.equal(2);
		expect(pacman.f).to.equal("SOUTH");
	});


	/**
	 * Move Pacman function tests.
	 */
	it("should move 1 unit in the facing direction.", () => {
		pacman.place([0,0,"EAST"]);
		pacman.move();
		expect(pacman.x).to.equal(1);
		expect(pacman.y).to.equal(0);
		expect(pacman.f).to.equal("EAST");
	});

	it("should ignore move command if moving forward will get it off the table.", () => {
		pacman.place([0,0,"SOUTH"]);
		pacman.move();
		expect(pacman.x).to.equal(0);
		expect(pacman.y).to.equal(0);
		expect(pacman.f).to.equal("SOUTH");
	});


	/**
	 * Rotate Pacman function tests.
	 */
	it("should rotate left from the current facing direction.", () => {
		pacman.place([0,0,"NORTH"]);
		pacman.left();
		expect(pacman.f).to.equal("WEST");
	});

	it("should rotate right from the current facing direction.", () => {
		pacman.place([0,0,"NORTH"]);
		pacman.right();
		expect(pacman.f).to.equal("EAST");
	});

	/**
	 * Report function tests.
	 */

	it("should output its current position and facing direction when asked to report.", () => {
		let spy = sinon.spy(console, 'log');
		pacman.place([1,2,"NORTH"]);
		pacman.left();
		pacman.report();
		pacman.move();
		pacman.report();
		expect(spy.called).to.be.true;
		expect(spy.callCount).to.equal(2);
		expect(spy.getCall(0).args[0].split(' ')[1]).to.equal('1,2,WEST');
		expect(spy.getCall(1).args[0].split(' ')[1]).to.equal('0,2,WEST');
		spy.restore();
	});


	/**
	 * Process commands tests.
	 */

	it('should run through the commands in series', () => {
		let spy = sinon.spy(console, 'log');
		pacman.process([
			{
				name: 'place',
				args: [0, 0, 'NORTH']
			}, {
				name: 'move'
			}, {
				name: 'report'
			}
		]);
		expect(pacman.x).to.equal(0);
		expect(pacman.y).to.equal(1);
		expect(pacman.f).to.equal("NORTH");
		expect(spy.called).to.be.true;
		expect(spy.getCall(0).args[0].split(' ')[1]).to.equal('0,1,NORTH');
		spy.restore();
	});




});
