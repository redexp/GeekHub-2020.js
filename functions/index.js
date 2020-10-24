document.querySelectorAll('input[name], #formula').forEach(function (input) {
	input.addEventListener('keyup', function () {
		var a1 = document.querySelector('[name="a1"]');
		var b1 = document.querySelector('[name="b1"]');
		var a2 = document.querySelector('[name="a2"]');
		var b2 = document.querySelector('[name="b2"]');
		var formula = document.querySelector('#formula');
		var condition = document.querySelector('#condition');
		var result = document.querySelector('#result');

		try {
			var calculator = new Function('a1, b1, a2, b2', 'return ' + formula.value + ';');

			result.value = calculator(Number(a1.value), Number(b1.value), Number(a2.value), Number(b2.value));
		}
		catch (error) {
			result.value = '#ERROR';
			console.error(error.message);
		}


	});
});