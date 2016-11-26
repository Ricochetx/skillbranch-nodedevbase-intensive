import fetch from 'node-fetch';

export default async function getBase() {
	const url = "https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json";
	try {
		const res = await fetch(`${url}`);
        return res.json();
    }
    catch (err) {
        console.log("Some error", err);
    }
}