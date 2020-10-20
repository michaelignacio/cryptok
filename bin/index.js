#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const axios = require("axios");
const yargs = require("yargs");

const options = yargs
 .usage("Usage: -c <coin>")
 .option("c", { alias: "coin", describe: "Cryptocurrency coin to search the price for", type: "string", demandOption: true })
 .argv;

const coin = options.coin;

const url = `https://api.coingecko.com/api/v3/simple/price?ids=${options.coin}&vs_currencies=usd`;

let price = 0;

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
	price = res.data[coin].usd;

	const greeting = chalk.white.bold(price);

	const boxenOptions = {
	 padding: 1,
	 margin: 1,
	 borderStyle: "round",
	 borderColor: "green",
	 backgroundColor: "green"
	};
	const msgBox = boxen( greeting, boxenOptions );

	console.log(msgBox);
 });