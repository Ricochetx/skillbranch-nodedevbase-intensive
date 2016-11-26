import express from 'express';
import cors from 'cors';

import userRoute from "./userRoute.js";
import petsRoute from "./petsRoute.js";
import getBase from './getBase.js';

const app = express();

app.use(cors());

let base;
async function takeBase() {base = await getBase();}
takeBase();

app.get('/', (req, res)=>{
	res.send(base);
})

app.use('/users', userRoute);

app.use('/pets', petsRoute);

app.get('/*', (req, res) => {
	res.status(404).send("Not Found");
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
