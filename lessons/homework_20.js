(function calc() {
	try {
		var a = prompt('введите выражение', '2-6');
		if (isNaN(eval(a))) {
			throw new Error('NaN');
		}
		else if (!a) {
			throw new Error('empty');
		}
		alert(eval(a));
	}
	catch (err) {
		if (err.message === 'NaN') {
			alert('Ошибонька: получилось NaN');
		}
		else if (err.message === 'empty') {
			alert('Ну и иди');
			return 1;
		}
		else {
			alert('Ошибонька: ' + err.message);
		}
		calc();
	}
}());