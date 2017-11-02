function createTemplate(str) {
	return function(obj) {
		return str.replace(/\{\{(\w+)\}\}/g,function(match, key){
			return encodeHTML(obj[key]||'');
		}).replace(/\{\{!(\w+)\}\}/g,function(match, key){
			return obj[key]||'';
		});
	};
}