import React, {PureComponent} from 'react';
import FormGroupInput from './FormGroupInput';
import Phones from './Phones';

export default class UserForm extends PureComponent {
	state = {
		name: this.props.user.name,
		email: this.props.user.email,
		password: this.props.user.password,
		phones: this.props.user.phones.map(item => ({...item})), // deep clone

		nameValid: null,
		emailValid: null,
		passwordValid: null,
		phonesValid: [],
	};

	onSubmit = (e) => {
		e.preventDefault();

		const {name, email, password, phones} = this.state;

		var wordRule = /^[абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ]+$/;
		var words = name.trim().split(/\s+/);

		let nameValid = words.length === 3 && words.every(word => wordRule.test(word));

		var emailParts = email.split('@');
		var username = emailParts[0];
		var domain = emailParts[1];
		var usernameRule = /^[a-zA-Z0-9\-.]+$/;
		var emailRule1 = /^[^.].+[^.]$/;
		var emailRule2 = /^.*[^.]@[^.].*$/;

		let emailValid = (
			emailParts.length === 2 &&
			usernameRule.test(username) &&
			usernameRule.test(domain) &&
			domain.includes('.') &&
			emailRule1.test(email) &&
			emailRule2.test(email)
		);

		var passwordRule1 = /^[a-zA-Z0-9]{8,}$/;
		var passwordRule2 = /[a-z]/;
		var passwordRule3 = /[A-Z]/;
		var passwordRule4 = /[0-9]/;

		let passwordValid = (
			passwordRule1.test(password) &&
			passwordRule2.test(password) &&
			passwordRule3.test(password) &&
			passwordRule4.test(password)
		);

		var homeRule = /^[1-9]\d{5}$/;
		var mobileRule = /^(0\d{9}|3\d{11})$/;

		let phonesValid = phones.map(phone => (
			(phone.type === 'home' && homeRule.test(phone.number)) ||
			(phone.type === 'mobile' && mobileRule.test(phone.number))
		));

		this.setState({nameValid, emailValid, passwordValid, phonesValid});
	};

	onChangeInput = (field, value) => {
		this.setState({[field]: value});
	};

	onChangePhone = (index, data) => {
		let phones = [...this.state.phones];

		phones[index] = {
			...phones[index],
			...data,
		};

		this.setState({phones});
	};

	onRemovePhone = (index) => {
		let phones = [...this.state.phones];
		let phonesValid = [...this.state.phonesValid];

		phones.splice(index, 1);
		phonesValid.splice(index, 1);

		this.setState({phones, phonesValid});
	};

	onAddPhone = () => {
		let phones = [...this.state.phones, {number: '', type: 'home'}];

		this.setState({phones});
	};

	render() {
		const {name, email, password, phones} = this.state;
		const {nameValid, emailValid, passwordValid, phonesValid} = this.state;

		return (
			<div className="container p-5">
				<form onSubmit={this.onSubmit}>
					<FormGroupInput
						label="П.І.Б."
						type="text"
						name="full_name"
						hint="Обовʼязково прізвище, імʼя та по батькові. Тільки літерами українскього алфавіту"
						value={name}
						valid={nameValid}
						onChange={this.onChangeInput}
					/>
					<FormGroupInput
						label="Email"
						type="text"
						name="email"
						hint="Адреса електронної пошти"
						value={email}
						valid={emailValid}
						onChange={this.onChangeInput}
					/>
					<FormGroupInput
						label="Пароль"
						type="password"
						name="password"
						hint="Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери англійського алфавіту та числа"
						value={password}
						valid={passwordValid}
						onChange={this.onChangeInput}
					/>

					<Phones
						label="Телефони"
						value={phones}
						valid={phonesValid}
						onChange={this.onChangePhone}
						onRemove={this.onRemovePhone}
						onAdd={this.onAddPhone}
					/>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}