import express from 'express';
import cors from 'cors';

import colorToHex from "./colorToHex.js";

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	let colorLine = req.query.color || '';

	res.send(colorToHex(colorLine));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});