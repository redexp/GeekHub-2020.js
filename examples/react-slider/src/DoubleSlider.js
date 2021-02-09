import React from 'react';
import styled from 'styled-components';

export default class DoubleSlider extends React.PureComponent {
	state = {
		startPosition: 0,
		endPosition: 0,
		startValue: this.props.startValue || 0,
		endValue: this.props.endValue || 0,
	};

	bar = React.createRef();
	barWidth = 0;
	dragging = 'start';

	componentDidMount() {
		this.barWidth = this.bar.current.getBoundingClientRect().width;

		this.updatePositionsByValues();
	}

	updatePositionsByValues() {
		const {min, max} = this.props;

		this.setState(state => ({
			startPosition: Math.round(this.barWidth * (state.startValue - min) / (max - min)),
			endPosition: Math.round(this.barWidth * (state.endValue - min) / (max - min)),
		}));
	}

	startDragStart = (e) => {
		this.dragging = 'start';
		this.startDrag(e);
	};

	startDragEnd = (e) => {
		this.dragging = 'end';
		this.startDrag(e);
	};

	startDrag = (e) => {
		this.startX = e.clientX;
		this.originPosition = {
			start: this.state.startPosition,
			end: this.state.endPosition,
		};

		this.onDrag(e);

		document.body.addEventListener('mousemove', this.onDrag);
		document.body.addEventListener('mouseup', this.stopDrag);
	};

	onDrag = (e) => {
		const {min, max} = this.props;
		const {dragging} = this;

		const offset = e.clientX - this.startX;
		let position = this.originPosition[dragging] + offset;

		if (position > this.barWidth) {
			position = this.barWidth;
		}
		else if (position < 0) {
			position = 0;
		}
		else if (dragging === 'start' && position > this.state.endPosition) {
			position = this.state.endPosition;
		}
		else if (dragging === 'end' && position < this.state.startPosition) {
			position = this.state.startPosition;
		}

		const value = Math.round(position * (max - min) / this.barWidth) + min;

		this.setState({[dragging + 'Position']: position, [dragging + 'Value']: value}, this.triggerChange);
	};

	stopDrag = (e) => {
		this.onDrag(e);

		document.body.removeEventListener('mousemove', this.onDrag);
		document.body.removeEventListener('mouseup', this.stopDrag);
	};

	triggerChange = () => {
		const {onChange} = this.props;
		const {startValue, endValue} = this.state;

		onChange(startValue, endValue);
	};

	onChangeStart = (e) => {
		this.dragging = 'start';
		this.onChangeValue(e);
	};

	onChangeEnd = (e) => {
		this.dragging = 'end';
		this.onChangeValue(e);
	};

	onChangeValue = (e) => {
		const {min, max} = this.props;
		const {dragging} = this;

		let value = Number(e.target.value);

		if (Number.isNaN(value)) return;

		if (value > max) {
			value = max;
		}
		else if (value < min) {
			value = min;
		}
		else if (dragging === 'start' && value > this.state.endValue) {
			value = this.state.endValue;
		}
		else if (dragging === 'end' && value < this.state.startValue) {
			value = this.state.startValue;
		}

		if (value === this.state[dragging + 'Value']) return;

		this.setState({[dragging + 'Value']: value}, this.triggerChange);
		this.updatePositionsByValues();
	};

	render() {
		const {startPosition, endPosition, startValue, endValue} = this.state;

		return (
			<Root>
				<input type="number" value={startValue} onInput={this.onChangeStart}/>
				<input type="number" value={endValue} onInput={this.onChangeEnd}/>

				<Bar ref={this.bar}>
					<ColorLine
						start={startPosition}
						end={endPosition}
					/>
					<Handler
						position={startPosition}
						onMouseDown={this.startDragStart}
					/>
					<Handler
						position={endPosition}
						onMouseDown={this.startDragEnd}
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
	style: {
		left: p.start + 'px',
		width: p.end - p.start + 'px',
	}
}))`
	position: absolute;
	top: 0;
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