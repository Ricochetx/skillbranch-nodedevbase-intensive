import express from 'express';
import _ from "lodash";

import getBase from './getBase.js';

const router = express.Router();

let base;
async function takeBase() {base = await getBase();}
takeBase();

router.get('/',(req, res)=>{
	takeBase();
	let result = base.users;
	const petType = req.query.havePet;
	if(petType !== undefined) {
		const petList = _.partition(base.pets, {"type" : petType})[0]; 
		result =[]
		for (let i = 0; i < petList.length; i += 1) {
			let user = _.find(base.users, {'id': petList[i].userId});
			if (!_.includes(result, user)) result.push(user);
	}
}
	res.send(_.sortBy(result, (o)=>{return o.id}));
});

router.get('/populate',(req, res)=>{
	let result = base.users;
	let petList =[];
	const petType = req.query.havePet;
	if(petType !== undefined) {
		petList = _.partition(base.pets, {"type" : petType})[0]; 
		result =[]
		for (let i = 0; i < petList.length; i += 1) {
			let user = _.find(base.users, {'id': petList[i].userId});
			if (!_.includes(result, user)) result.push(user);
	}
}
	for (let i = 0; i < result.length; i += 1) {
		petList = _.partition(base.pets, {"userId" : result[i].id})[0];
		result[i].pets = _.sortBy(petList, (o)=>{return o.id});
	}
	res.send(_.sortBy(result, (o)=>{return o.id}));
});

router.get('/:usernameOrId',(req, res)=>{
	takeBase();
	let result;
	if (_.isNaN(+req.params.usernameOrId)) {
		result = _.find(base.users, {'username': req.params.usernameOrId});
	}
	else {
		result = _.find(base.users, {'id': +req.params.usernameOrId});
	}
	if (result === undefined) res.status(404).send('Not Found');
	res.send(result);
});

router.get('/:usernameOrId/pets',(req, res)=>{
	takeBase();
	let result;
	if (_.isNaN(+req.params.usernameOrId)) {
		result = _.find(base.users, {'username': req.params.usernameOrId});
	}
	else {
		result = _.find(base.users, {'id': +req.params.usernameOrId});
	}
	if (result === undefined) res.status(404).send('Not Found');
	result = _.partition(base.pets, {"userId" : result.id})[0];
	res.send(_.sortBy(result, (o)=>{return o.id}));
});

router.get('/:usernameOrId/populate',(req, res)=>{
	let result;
	if (_.isNaN(+req.params.usernameOrId)) {
		result = _.find(base.users, {'username': req.params.usernameOrId});
	}
	else {
		result = _.find(base.users, {'id': +req.params.usernameOrId});
	}
	if (result === undefined) res.status(404).send('Not Found');
	let petList = _.partition(base.pets, {"userId" : result.id})[0];
	result.pets = _.sortBy(petList, (o)=>{return o.id});
	res.send(result);
});

router.get('/*', (req, res) => {
	res.status(404).send("Not Found");
});

module.exports = router;
