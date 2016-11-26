export default function volumeSpace(pc) {
	const discs = pc["hdd"];
	let result = {};
	for (let i = 0; i < discs.length; i++) {
		let discName = discs[i]["volume"];
		result[discName] = (( parseInt(result[discName]) || 0 ) 
			+ discs[i]["size"])  
		+ "B";
	}
	return result;
}