document.querySelectorAll('input[name], #formula, #condition').forEach(function (input) {
	input.addEventListener('keyup', function () {
		var data = {};

		document.querySelectorAll('input[name]').forEach(function (input) {
			data[input.name] = Number(input.value);
		});

		var formula = document.querySelector('#formula');
		var condition = document.querySelector('#condition');
		var result = document.querySelector('#result');

		try {
			var calculator = new Function('cells', 'with (cells) { return ' + formula.value + ';}');
			var test = new Function('cells', 'with (cells) { return ' + condition.value + ';}');

			result.value = calculator(data);
			result.style.backgroundColor = test(data) ? '#B6D7A8' : '#FFFFFF';
		}
		catch (error) {
			result.value = '#ERROR';
			console.error(error.message);
		}


	});
});