const hsl = require('hsl-to-hex');

export default function colorConverterToHex(colorData) {
	let colorInfo = colorData.split(/\#|\(|\,|\)|\%/).filter(el=>el);
	if (colorInfo[0] === 'rgb'){
		const red = parseInt(colorInfo[1]);
		const green = parseInt(colorInfo[2]);
		const blue = parseInt(colorInfo[3]);
		if (check(red, 0, 255) && check(blue, 0, 255) && check(green, 0, 255)) {
			return "#" + rgbToHex(red, green, blue).toLowerCase();
		}
		return 'Invalid color';
	}
	else if (colorInfo[0] === 'hsl') {
		const hue = parseInt(colorInfo[1]);
	    const saturation = parseInt(colorInfo[2]);
        const luminosity = parseInt(colorInfo[3]);
		if (check(hue, 0, 359) && check(saturation, 0, 100) && check(luminosity, 0, 100)) {
			return hsl(hue, saturation, luminosity).toLowerCase();
		}
		return 'Invalid color';
	}
	else {
		if (colorInfo[0].length === 6) return '#' + colorInfo[0].toLowerCase();
		return '#' + colorInfo[0].split('').map(el=>el + el).join("").toLowerCase();
	}
}

function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}

function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

function check (arg, min, max) {
	if (arg >= min && arg <= max) {
		return true;
	}
	return false;
}