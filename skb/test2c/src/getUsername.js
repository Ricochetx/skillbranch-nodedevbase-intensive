export default function getUsername(url) {
	let re = new RegExp('@?(https?:)?(//)?(([a-z.])[^/]*/)?@?([a-zA-Z0-9._]*)', 'i');
	let username = url.match(re);
	console.log(username);
	return '@' + username[5];
	}
