import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.PureComponent {
	state = {
		position: 0,
		value: this.props.value || 0,
	};

	bar = React.createRef();
	barWidth = 0;

	componentDidMount() {
		this.barWidth = this.bar.current.getBoundingClientRect().width;

		this.updatePositionByValue();
	}

	updatePositionByValue() {
		const {min, max} = this.props;

		this.setState(state => ({position: Math.round(this.barWidth * (state.value - min) / (max - min))}));
	}

	startDrag = (e) => {
		this.startX = e.clientX;
		this.originPosition = this.state.position;

		this.onDrag(e);

		document.body.addEventListener('mousemove', this.onDrag);
		document.body.addEventListener('mouseup', this.stopDrag);
	};

	onDrag = (e) => {
		const {min, max, onChange} = this.props;

		const offset = e.clientX - this.startX;
		let position = this.originPosition + offset;

		if (position > this.barWidth) {
			position = this.barWidth;
		}
		else if (position < 0) {
			position = 0;
		}

		const value = Math.round(position * (max - min) / this.barWidth) + min;

		onChange(value);

		this.setState({position, value});
	};

	stopDrag = (e) => {
		this.onDrag(e);

		document.body.removeEventListener('mousemove', this.onDrag);
		document.body.removeEventListener('mouseup', this.stopDrag);
	};

	onChangeValue = (e) => {
		const {min, max, onChange} = this.props;
		const {value: originValue} = this.state;

		let value = Number(e.target.value);

		if (Number.isNaN(value)) return;

		if (value > max) {
			value = max;
		}
		else if (value < min) {
			value = min;
		}

		if (value === originValue) return;

		onChange(value);

		this.setState({value});
		this.updatePositionByValue();
	};

	render() {
		const {position, value} = this.state;

		return (
			<Root>
				<input value={value} type="number" onInput={this.onChangeValue}/>

				<Bar ref={this.bar}>
					<ColorLine
						position={position}
					/>
					<Handler
						position={position}
						onMouseDown={this.startDrag}
					/>
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

const ColorLine = styled.div.attrs(p => ({
	style: {width: p.position + 'px'}
}))`
	height: 2px;
	background-color: green;
`;

const Handler = styled.div.attrs(p => ({
	style: {left: p.position + 'px'}
}))`
    position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
	background-color: red;
	top: -4px;
`;

//endregion