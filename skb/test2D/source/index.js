import express from 'express';
import cors from 'cors';
import _ from 'lodash';

import colorConverterToHex from './colorConverterToHex.js';
import getColorData from './getColorData.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	const recievedData = req.query.color || '';

	const colorData = getColorData(recievedData);
	
	if (!colorData || colorData[0] !== colorData.input) {
		res.send("Invalid color");
	}
	else {
	    const colorDataType = colorData[0].split(/\#|\(|\)|\s+|\%/)
          .filter(el=>el);
	    res.send(colorConverterToHex(colorDataType).toLowerCase());
	}
});
	

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
