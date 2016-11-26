import _ from 'lodash';

export default function getFullName(fullName) {
	
	const regex = /[-{}*+?.,\\^$|#_\/\d]/;
	let arr = fullName.toUpperCase()
	    .split(/\s+/)
	    .filter(el=>el);
	let init = [];
	
	let shortName = 'Invalid fullname';
	
	if (arr.length !== 0 && arr.length <= 3 && !regex.test(fullName)) {

		shortName = _.capitalize(arr.pop());

		init = arr.map(el=>el[0] + '.');
		
		shortName = [shortName, ...init].join(' ');
	}

	return shortName;
}