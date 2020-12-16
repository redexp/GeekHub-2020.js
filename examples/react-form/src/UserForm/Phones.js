import React, {PureComponent} from 'react';
import Input from './Input';

export default class Phones extends PureComponent {
	render() {
		const {label, value, valid, onChange, onRemove, onAdd} = this.props;

		return (
			<div className="form-group">
				<label>{label}</label>
				{value.map((item, i) => (
					<Phone
						key={i}
						number={item.number}
						type={item.type}
						valid={valid[i]}
						index={i}
						onChange={onChange}
						onRemove={onRemove}
					/>
				))}

				<button onClick={onAdd} type="button" className="btn btn-sm btn-success">Додати</button>
			</div>
		);
	}
}

class Phone extends PureComponent {
	onChangeNumber = (e) => {
		const {type, index, onChange} = this.props;

		onChange(index, {type, number: e.currentTarget.value});
	};

	onChangeType = (e) => {
		const {number, index, onChange} = this.props;

		onChange(index, {number, type: e.currentTarget.value});
	};

	onRemove = () => {
		const {index, onRemove} = this.props;

		onRemove(index);
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