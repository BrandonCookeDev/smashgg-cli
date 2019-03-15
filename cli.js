'use strict'

const fs = require('fs')
const path = require('path')

const smashgg = require('smashgg.js')
const inquirer = require('inquirer')
const program = require('commander')

const VERSION = '1.0.0'
const API_TOKEN_FILEPATH = path.join(__dirname, '.api_token')
const ONLY_ALLOW_ONE_OF_THESE = ['tournament', 'event', 'phase', 'phasegroup']

program
	.version(VERSION)
	.option('-t, --tournament', 'delineates you wish to retrieve a tournament\' data')
	.option('-e, --event', 'delineates you wish to retrieve an event\'s data')
	.option('-P, --phase', 'delineates you wish to retrieve a phase\'s data')
	.option('-p, --phasegroup', 'delineates you wish to retrieve a phasegroup\'s data')
	.option('-s, --set', 'delineates you wish to retrieve a set\'s data')
	.option('-u, --user', 'delineates you wish to retrieve a user\'s data')
	.option('-a, --attendee', 'delineates you wish to retrieve an attendee\'s data')
	.option('-e, --entrant', 'delineates you wish to retrieve an entrant\'s data')
	.option('-i, --id <number>', 'the id number of the object you wish to get')
	.option('-n, --name <name>', 'the name or slug of the object you wish to get')
	.parse(process.argv)

////////////////////////////////
// ERROR HANDLING
const errHandle = function(e){
	console.error('smashgg-cli ecountered an error: %s', e.message)
	console.log(program.help)
	process.exit(1)
}

process.on('error', errHandle)
process.on('unhandledRejection', errHandle)
process.on('uncaughtException', errHandle)
//
///////////////////////////////

(async function(){

	// get the api token
	let apiToken, API_TOKEN
	if(doesApiFileExist()){
		apiToken = getApiTokenFromFile()
	} else {
		let answers = await inquirer.prompt([
			{
				message: 'Please insert your API Token (You\'ll only need to do this once)',
				name: API_TOKEN,
				type: 'string',
				filter: key => {
					return new Promise(function(resolve, reject){
						try{ resolve(key) } 
						catch(e){ reject(e) }
					})
				}
			}
		])
		createApiFile(answers.API_TOKEN)
		apiToken = answers.API_TOKEN
	}

	// init the sdk
	smashgg.initialize(apiToken)

})()

function doesApiFileExist(){
	return fs.existsSync(API_TOKEN_FILEPATH)
}

function createApiFile(apiToken){
	if(doesApiFileExist)
		throw new Error('createApiFile: expected file to not exist')

	fs.writeFileSync(API_TOKEN_FILEPATH, apiToken)
}

function getApiTokenFromFile(){
	if(!doesApiFileExist())
		throw new Error('getApiTokenFromFile: expected file to exist')

	return fs.readFileSync(API_TOKEN_FILEPATH, 'utf8')
}

function validateCliCommand(programOutput){
	let keys = Object.keys()

	// check if no args
	if(keys.length <= 0)
		throw new Error('cli command is empty!')
	
	// check if any required arg exists
	if(!keys.some(e => ONLY_ALLOW_ONE_OF_THESE.includes(e)))
		throw new Error('cli command missing one of the required args')

	// check if only one of a required arg
	
}

function doCliCommand(programOutput){

}