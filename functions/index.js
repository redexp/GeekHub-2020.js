



document.querySelectorAll('input[name], #formula').forEach(function (input) {
	input.addEventListener('keyup', function () {
		var data = {};

		document.querySelectorAll('input[name]').forEach(function (input) {
			data[input.name] = Number(input.value);
		});

		var formula = document.querySelector('#formula');
		var result = document.querySelector('#result');

		try {
			var calculator = new Function('cells', 'with (cells) { return ' + formula.value + ';}');

			result.value = calculator(data);
		}
		catch (error) {
			result.value = '#ERROR';
			console.error(error.message);
		}


	});
});