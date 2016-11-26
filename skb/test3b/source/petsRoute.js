import express from 'express';
import _ from "lodash";

import getBase from './getBase.js';

const router = express.Router();

let base;
async function takeBase() {base = await getBase();}
takeBase();

router.get('/', (req, res)=>{
	takeBase();
	let result = base.pets;
	const type = req.query.type;
	const age_gt = req.query.age_gt;
	const age_lt = req.query.age_lt;
	if (type !== undefined) {
		result = _.partition(result, {"type" : type})[0];
	}
	if (age_gt !== undefined) {
		result = _.partition(result, (o)=>{return o.age > age_gt})[0];
	}
	if (age_lt !== undefined) {
		result = _.partition(result, (o)=>{return o.age < age_lt})[0];
	}
	res.send(_.sortBy(result, (o)=>{return o.id}));
});

router.get('/populate',(req, res)=>{
	let result = base.pets;
	let user;
	const type = req.query.type;
	const age_gt = req.query.age_gt;
	const age_lt = req.query.age_lt;
	if (type !== undefined) {
		result = _.partition(result, {"type" : type})[0];
	}
	if (age_gt !== undefined) {
		result = _.partition(result, (o)=>{return o.age > age_gt})[0];
	}
	if (age_lt !== undefined) {
		result = _.partition(result, (o)=>{return o.age < age_lt})[0];
	}
	for (let i = 0; i < result.length; i += 1) {
		user = _.find(base.users, {"id" : +result[i].userId});
		result[i].user = user;
	}
	res.send(_.sortBy(result, (o)=>{return o.id}));
});


router.get('/:id', (req, res)=>{
	takeBase();
	let result = _.find(base.pets, {'id': +req.params.id});
	if (result === undefined) res.status(404).send('Not Found');
	res.send(result);
});

router.get('/:id/populate',(req, res)=>{
	let result = _.find(base.pets, {'id': +req.params.id});
	if (result === undefined) res.status(404).send('Not Found');
	let user = _.find(base.users, {"id" : +result.userId});
	result.user = user;
	res.send(result);
});

router.get('/*', (req, res) => {
	res.status(404).send("Not Found");
});


module.exports = router;