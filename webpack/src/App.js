import React, {PureComponent} from 'react';

export default class App extends PureComponent {
	render() {
		const data = [
			['asd', 'qwe'],
			['yui', 'dfg'],
			['yui', 'dfg'],
		];

		const table = data.map();

		return (
			<table>
				<tbody>
				{table}
				</tbody>
			</table>
		);
	}
}