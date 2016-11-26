import fetch from 'node-fetch';

export default async function getPcSpec (url) {
  try {
    const res = await fetch(`${url}`);
    return res.json();
  }
  catch (err) {
    console.log("Some error", err);
  }
	}