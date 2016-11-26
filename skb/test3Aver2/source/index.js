import express from 'express';
import cors from 'cors';
import _ from 'lodash';

import getPcSpec from './getPcSpec.js';
import volumeSpace from './volume.js'

const app = express();

app.use(cors())

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

app.get('/volumes', async (req, res) => {
	let pc = await getPcSpec(pcUrl);
	res.status(200).send(JSON.stringify(volumeSpace(pc)));
});

app.get('/*', async (req, res) => {

	let status = 200;
	let countEmptySpace = 0;

	let pc = await getPcSpec(pcUrl);

	const ask = req.params[0].split('/')
	  .filter(function (elem) {  	
	if (elem === '') countEmptySpace += 1;

	if (countEmptySpace > 1) status = 404;
	
	return elem !== '';});

	let answer = pc;

	for (let i = 0; i < ask.length; i++){
		console.log(answer);
		if (!check(answer, ask[i])) {
			status = 404;
			break;
		}
		answer = _.get(answer, ask[i]);
	}

	if (status === 200) {
		res.status(200).send(JSON.stringify(answer, "", 4));
	}
	else {
		res.status(404).send("Not Found");
	}
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

function check(arg, ask) {

	let listOfProperty = [];
	
	_.forOwn(arg, (value, key) => {
		listOfProperty.push(key);
	});

	return listOfProperty.some((elem) =>
		{ return elem === ask });
}
