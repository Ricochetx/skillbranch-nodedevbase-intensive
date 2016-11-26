import hsl_to_hex from 'hsl-to-hex';

export default function colorConverterToHex(colorDataType) {
	const colorData = clearData(colorDataType);
	if (colorDataType[0] === 'rgb'){
		return '#' + rgbToHex(colorData[0], colorData[1], colorData[2]);
	}
	else if (colorDataType[0] === 'hsl') {
		const hue = parseInt(colorData[0]);
	    const saturation = parseInt(colorData[1]);
        const luminosity = parseInt(colorData[2]);
		return hsl_to_hex(hue, saturation, luminosity);
	}
	else {
		if (colorDataType[0].length === 6) return '#' + colorDataType[0];
		return '#' + colorDataType[0].split('').map(el=>el + el).join("");
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

function clearData(Data) {
	return Data.slice(1, Data.length).join('').split(/\,/).filter(el=>el);
}