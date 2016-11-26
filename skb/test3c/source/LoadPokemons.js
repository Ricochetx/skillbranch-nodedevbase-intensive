import fetch from 'node-fetch';
import Promise from 'bluebird';
import fs from 'fs';

const baseUrl = 'https://pokeapi.co/api/v2';
const pokeUrl = `${baseUrl}/pokemon/`;

export default async function loadPokemons() {
	const pokemons = await getPokemons(pokeUrl);
	const pokemProm = pokemons.map((o) => {return getPokemon(o.url)});
	const allPokemons = await Promise.all(pokemProm);
	return allPokemons;
}

async function getPokemons (url) {
	try {
		const res = await fetch(`${url}`);
		const page = await res.json();
		const pokemons = page.results;

		if (page.next) {
			const nextPagePokemons = await loadPokemons(page.next);
			return [...pokemons, ...nextPagePokemons]; 
		}
		return pokemons
	}
	catch(err) {
		console.log('Some Error in main fuct: ' + err);
	}
}

async function getPokemon (url) {
	try {
		const res = await fetch(`${url}`);
		const pokemon = await res.json();
		return pokemon;
	}
	catch(err) {
		console.log('Some Error getPok : ' + err);
	}
}