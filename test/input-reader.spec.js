'use strict';


import InputReader from "../src/input-reader";
import { expect, should } from 'chai';
import path from "path";

should();

describe("InputReader", () => {

	let inputReader;

	beforeEach(() => {
		inputReader = new InputReader();
	});


	it("should throw an error if the file doesn\'t have an extension", done => {
		inputReader.readFile(path.join(__dirname, 'data/sample-no-extension'), err => {
			expect(err).to.exist;
			done();
		});
	});

	it("should throw an error if the file is not a text file", done => {
		inputReader.readFile(path.join(__dirname, 'data/sample-invalid-file.csv'), err => {
			expect(err).to.exist;
			done();
		});
	});

	it("should read the contents of a text file correctly", done => {
		inputReader.readFile(path.join(__dirname, 'data/sample-data1.txt'), (err, fileData) => {
			expect(err).to.be.null;
			expect(fileData).to.equal('PLACE 0,0,NORTH\nMOVE\nREPORT');
			done();
		});
	});

	it("should throw an error if the file is empty", done => {
		inputReader.readFile(path.join(__dirname, 'data/sample-empty-file.txt'), err => {
			expect(err).to.exist;
			done();
		});
	});

	it("should throw an error if the file doesn\'t exists", done => {
		inputReader.readFile(path.join(__dirname, 'data/fake-file.txt'), err => {
			expect(err).to.exist;
			done();
		});
	});

	it('should throw an error if no raw commands are passed', done => {
		inputReader.parseInputCommands("", err => {
			expect(err).to.exist;
			expect(err.message).to.equal("Sorry, no commands were passed");
			done();
		});
	});

	it('should parse the raw input commands from file data correctly', done => {
		inputReader.parseInputCommands("PLACE 0,0,NORTH\nMOVE\nREPORT", (err, parsedArray) => {
			expect(err).to.equal(null);
			expect(parsedArray).to.deep.equal([{name:'place', args:[0,0,'NORTH']},{ name: 'move'},{ name: 'report'}]);
			done();
		});
	});

});
