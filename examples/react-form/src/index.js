import React from 'react';
import ReactDom from 'react-dom';
import UserForm from './UserForm';

const user = {
	name: 'Тарас Григорович Шевченко',
	email: 'taras@mail.com',
	password: 'Taras123',
	phones: [
		{number: '651122', type: 'home'},
		{number: '0123456789', type: 'mobile'},
		{number: '380123456789', type: 'mobile'},
	],
};

ReactDom.render(
	<UserForm
		user={user}
	/>,
	document.querySelector('#root')
);