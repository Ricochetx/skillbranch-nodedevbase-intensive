import express from 'express';
import cors from 'cors';
import getUsername from './getUsername.js';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
	
	const url = req.query.username;
	
	res.send(getUsername(url));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
