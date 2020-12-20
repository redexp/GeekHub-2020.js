import React, {PureComponent} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Input from './Input';

export default class Phones extends PureComponent {
	state = {
		phones: cloneDeep(this.props.value)
	};

	onRemove = (item) => {
		const {onChange} = this.props;

		let phones = this.state.phones.filter(phone => phone !== item);

		this.setState({phones});

		onChange(phones);
	};

	onChange = (item, newItem) => {
		const {onChange} = this.props;

		let phones = [...this.state.phones];

		phones[phones.indexOf(item)] = newItem;

		this.setState({phones});

		onChange(phones);
	};

	onAdd = () => {
		const {onChange} = this.props;
		let phones = [...this.state.phones, {number: '', type: 'home'}];
		this.setState({phones});
		onChange(phones);
	};

	render() {
		const {label, valid} = this.props;
		const {phones} = this.state;

		return (
			<div className="form-group">
				<label>{label}</label>
				{phones.map((item, i) => (
					<Phone
						key={i}
						number={item.number}
						type={item.type}
						valid={valid[i]}
						payload={item}
						onChange={this.onChange}
						onRemove={this.onRemove}
					/>
				))}

				<button onClick={this.onAdd} type="button" className="btn btn-sm btn-success">Додати</button>
			</div>
		);
	}
}

class Phone extends PureComponent {
	onChangeNumber = (e) => {
		const {type, payload, onChange} = this.props;

		onChange(payload, {type, number: e.currentTarget.value});
	};

	onChangeType = (e) => {
		const {number, payload, onChange} = this.props;

		onChange(payload, {number, type: e.currentTarget.value});
	};

	onRemove = () => {
		const {payload, onRemove} = this.props;

		onRemove(payload);
	};

	render() {
		const {number, type, valid} = this.props;

		return (
			<div className="input-group mb-3">
				<Input valid={valid} value={number} onChange={this.onChangeNumber} type="text" className="form-control"/>
				<select value={type} onChange={this.onChangeType} className="custom-select">
					<option value="home">Домашній</option>
					<option value="mobile">Мобільний</option>
				</select>
				<div className="input-group-append">
					<button onClick={this.onRemove} className="btn btn-outline-secondary" type="button">Видалити</button>
				</div>
			</div>
		);
	}
}