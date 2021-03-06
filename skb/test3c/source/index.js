import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import fs from 'fs';
import fetch from 'node-fetch';
import Promise from 'bluebird';

import getPokemonsBase from './pokemonsBase.js';
import loadPokemons from "./LoadPokemons.js";

const __DEV__ = true;
const baseUrl = 'https://pokeapi.co/api/v2';
const pokeUrl = `${baseUrl}/pokemon/`;

const app = express();

app.use(cors());

let pokemonsBase ;

app.use(async (req, res, next) => {
if (__DEV__) {
	pokemonsBase = getPokemonsBase();
}
else {
	pokemonsBase = await loadPokemons();
}
next();
});

app.get('/', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  let result = _.sortBy(pokemonsBase, (o)=>{return o.name;});
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/angular', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  const pokemonsWithAngular = pokemonsBase.map((p) => {
    p.angular = p.weight / p.height; 
    return p;
  });
  let result = pokemonsWithAngular.sort(min('angular'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/huge', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  let result = pokemonsBase.sort(max('height'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/micro', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  let result = pokemonsBase.sort(min('height'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/fat', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  const pokemonsWithAngular = pokemonsBase.map((p) => {
    p.angular = p.weight / p.height; 
    return p;
  });
  let result = pokemonsWithAngular.sort(max('angular'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/heavy', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  let result = pokemonsBase.sort(max('weight'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});

app.get('/light', (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  let result = pokemonsBase.sort(min('weight'));
  result = result.splice(offset, limit);
  const names = result.map(p => { return p.name; });
  res.send(names);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

function max(key) {
  return function (a, b) {
    const result = b[key] - a[key];
    return result == 0 ? sortName(a, b) : result;
  }
}

function min(key) {
  return function (a, b) {
    const result = a[key] - b[key];
    return result == 0 ? sortName(a, b) : result;
  }
}

function sortName (a, b) {
  return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
}

