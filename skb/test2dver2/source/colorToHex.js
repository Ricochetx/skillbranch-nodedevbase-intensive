import colorConverterToHex from "./colorConverterToHex.js";

export default function colorToHex(colorLine) {
	let newColorLine = colorLine.replace(/\%20/g,' ');
	newColorLine = newColorLine.split(' ').filter(el=>el).join('');
	const hexReg = new RegExp(/#?([a-fA-F\d]{3}){1,2}/);
	const rgbReg = new RegExp(/rgb\((\d{1,3},){2}\d*\)/);
	const hslReg = new RegExp(/hsl\(\d*\,\d*\%\,\d*\%\)/);
	let regTests = [hexReg, rgbReg, hslReg];
	let colorData;
	let result = "Invalid color";
	for (let i = 0; i < regTests.length; i += 1) {
		colorData = newColorLine.match(regTests[i]);
		if (!colorData || colorData[0] !== colorData.input) {
			continue;
		}
		result = colorConverterToHex(colorData[0]);
		break;
	}
	return result;
}