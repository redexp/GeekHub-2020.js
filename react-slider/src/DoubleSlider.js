import React from 'react';
import styled from 'styled-components';

export default class DoubleSlider extends React.PureComponent {
	render() {
		return (
			<Root>
				<input/>
				<input/>

				<Bar>
					<Handler value={100}/>
					<Handler value={200}/>
				</Bar>
			</Root>
		);
	}
}


//region ====================== Styles ========================================

const Root = styled.div`
    padding: 10px 0;
`;

const Bar = styled.div`
    position: relative;
	height: 2px;
	background-color: black;
    margin-top: 10px;
`;

const Handler = styled.div`
    position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
    background-color: red;
	top: -4px;
	left: ${p => p.value + 'px'};
`;

//endregion