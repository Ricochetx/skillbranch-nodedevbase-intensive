import express from 'express';
import cors from 'cors';
import getFullName from './getFullName.js';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
	const name = req.query.fullname;
    res.send(getFullName(name));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
