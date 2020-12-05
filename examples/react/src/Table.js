import React from 'react';

const alpha = 'abcdefg';

export default function Table(props) {
	let {columns, rows, cell, data} = props;

	let table = [];
	let headers = [];
	let rowStart;
	let colStart;

	if (cell) {
		cell = cell.match(/^([a-z]+)(\d+)$/);

		colStart = alpha.indexOf(cell[1]);
		rowStart = Number(cell[2]) - 1;
	}

	for (let i = 0; i < columns; i++) {
		headers.push(alpha.charAt(i).toUpperCase());
	}

	for (let i = 0; i < rows; i++) {
		let row = [];
		table.push(row);

		for (let j = 0; j < columns; j++) {
			let value = '';

			if (i >= rowStart && j >= colStart && i - rowStart < data.length && j - colStart < data[0].length) {
				value = data[i - rowStart][j - colStart];
			}

			row.push(value);
		}
	}

	return (
		<table>
			<thead>
			<tr>
				<th>&nbsp;</th>

				{headers.map(letter => (
					<th key={letter}>{letter}</th>
				))}
			</tr>
			</thead>

			<tbody>
			{table.map((row, i) => (
				<tr>
					<th>{i + 1}</th>

					{row.map((cell, j) => (
						<td>
							<input value={cell}/>
						</td>
					))}
				</tr>
			))}
			</tbody>
		</table>
	);
};