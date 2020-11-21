const alpha = 'abcdefg';

jQuery('tbody').on('paste', 'input', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;
	var data = text.split("\n").map(line => line.split(';'));
	var column = input.parentNode.cellIndex - 1;
	var row = input.parentNode.parentNode.sectionRowIndex;
	var rowsNumber = row + data.length;
	var columnsNumber = column + data[0].length;
	var thead = document.querySelector('thead');
	var tbody = document.querySelector('tbody');

	for (let rowIndex = 0; rowIndex < rowsNumber; rowIndex++) {
		for (let colIndex = 0; colIndex < columnsNumber; colIndex++) {
			var th = thead.children[0].children[colIndex + 1];

			if (!th) {
				createHead(colIndex)
					.appendTo(thead.children[0]);
			}

			var tr = tbody.children[rowIndex];

			if (!tr) {
				tr = jQuery('<tr>')
					.append(
						jQuery('<th>').text(rowIndex + 1)
					)
					.appendTo(tbody)
					.get(0);
			}

			var td = tr.children[colIndex + 1];

			if (!td) {
				td = createCell(rowIndex, colIndex)
					.appendTo(tr)
					.get(0);
			}

			if (rowIndex < row || colIndex < column) continue;

			td.children[0].value = data[rowIndex - row][colIndex - column];
		}
	}
});

var currentColumn;

jQuery('thead').on('contextmenu', 'tr > th:nth-child(n + 2)', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');

	menu.addClass('d-block');

	menu.css({
		left: e.clientX,
		top: e.clientY
	});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');
	var column = currentColumn.cellIndex;

	switch (action) {
		case 'add-left':
			createHead(column).insertBefore(currentColumn);
			resetHeaders();

			jQuery(`tbody > tr > td:nth-child(${column + 1})`).each(function (i, td) {
				var row = td.parentNode.sectionRowIndex;
				var column = td.cellIndex;

				createCell(row, column - 1).insertBefore(td);
			});

			resetInputNames();
			break;

		case 'add-right':
			createHead(column).insertAfter(currentColumn);
			resetHeaders();

			jQuery(`tbody > tr > td:nth-child(${column + 1})`).each(function (i, td) {
				var row = td.parentNode.sectionRowIndex;
				var column = td.cellIndex;

				createCell(row, column + 1).insertAfter(td);
			});

			resetInputNames();
			break;

		case 'remove':
			jQuery(`tr > *:nth-child(${column + 1})`).remove();
			resetHeaders();
			resetInputNames();
			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});

function createHead(index) {
	return jQuery('<th>').text(alpha.charAt(index).toUpperCase());
}

function createCell(row, column) {
	return jQuery('<td>').append(
			jQuery('<input>').attr('name', getCellName(row, column))
		);
}

function resetHeaders() {
	jQuery('thead > tr > th').each(function (i, th) {
		var index = th.cellIndex;

		if (index === 0) return;

		th.textContent = alpha.charAt(index - 1).toUpperCase();
	});
}

function getCellName(row, column) {
	return alpha.charAt(column) + (row + 1);
}

function resetInputNames() {
	jQuery('tbody > tr > td').each(function (i, td) {
		var row = td.parentNode.sectionRowIndex;
		var column = td.cellIndex;

		td.children[0].name = getCellName(row, column - 1);
	});
}