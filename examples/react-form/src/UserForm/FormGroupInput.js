import React, {PureComponent} from 'react';
import Input from './Input';

export default class FormGroupInput extends PureComponent {
	onChange = (e) => {
		const {name, onChange} = this.props;

		onChange(name, e.currentTarget.value);
	};

	render() {
		const {label, name, type, value, hint, valid} = this.props;

		return (
			<div className="form-group">
				<label>{label}</label>
				<Input valid={valid} type={type} name={name} value={value} onChange={this.onChange} className="form-control"/>
				<small className="form-text text-muted">{hint}</small>
			</div>
		);
	}
}