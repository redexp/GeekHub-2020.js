import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Table from './Table';

const alpha = 'abcdefghijklmnopqrstuvwxyz';

ReactDom.render(
	<Table columns={2} rows={2}/>,
	document.querySelector('#root')
);

const store = [];

$('body').on('paste', 'input', function (e) {
	e.preventDefault();

	let text = e.originalEvent.clipboardData.getData('text/plain');
	let input = e.currentTarget;
	let data = text.split("\n").map(line => line.split(';'));
	let column = input.parentNode.cellIndex - 1;
	let row = input.parentNode.parentNode.sectionRowIndex;
	let rowsNumber = row + data.length;
	let columnsNumber = column + data[0].length;

	for (let i = 0; i < rowsNumber; i++) {
		let list = store[i];

		if (!list) {
			list = [];
			store.push(list);
		}

		for (let j = 0; j < columnsNumber; j++) {
			if (j >= list.length) {
				list.push('');
			}

			if (i >= row && j >= column && i - row < data.length && j - column < data[0].length) {
				list[j] = data[i - row][j - column];
			}
		}
	}

	ReactDom.render(
		<Table
			columns={store[0].length}
			rows={store.length}
			cell="a1"
			data={store}
		/>,
		document.querySelector('#root')
	);
});

function getCellName(row, column) {
	return alpha.charAt(column) + (row + 1);
}