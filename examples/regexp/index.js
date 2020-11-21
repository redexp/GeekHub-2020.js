document.querySelector('#user-form').addEventListener('submit', function (e) {
	e.preventDefault();

	const SUCCESS = '#C2E0C6';
	const ERROR = '#F9D0C4';

	var name = document.querySelector('[name="full_name"]');
	var email = document.querySelector('[name="email"]');
	var password = document.querySelector('[name="password"]');

	var wordRule = /^[абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ]+$/;
	var words = name.value.trim().split(/\s+/);

	name.style.backgroundColor = words.length === 3 && words.every(word => wordRule.test(word)) ? SUCCESS : ERROR;

	var emailParts = email.value.split('@');
	var username = emailParts[0];
	var domain = emailParts[1];
	var usernameRule = /^[a-zA-Z0-9\-.]+$/;
	var emailRule1 = /^[^.].+[^.]$/;
	var emailRule2 = /^.*[^.]@[^.].*$/;

	email.style.backgroundColor = (
		emailParts.length === 2 &&
		usernameRule.test(username) &&
		usernameRule.test(domain) &&
		domain.includes('.') &&
		emailRule1.test(email.value) &&
		emailRule2.test(email.value)
	) ? SUCCESS : ERROR;

	var passwordRule1 = /^[a-zA-Z0-9]{8,}$/;
	var passwordRule2 = /[a-z]/;
	var passwordRule3 = /[A-Z]/;
	var passwordRule4 = /[0-9]/;

	password.style.backgroundColor = (
		passwordRule1.test(password.value) &&
		passwordRule2.test(password.value) &&
		passwordRule3.test(password.value) &&
		passwordRule4.test(password.value)
	) ? SUCCESS : ERROR;
});

document.querySelectorAll('[data-show]').forEach(function (button) {
	button.addEventListener('click', function (e) {
		var show = e.currentTarget.getAttribute('data-show');

		var description = document.querySelector('#description');
		var preview = document.querySelector('#preview');

		description.classList.toggle('d-none', show !== 'description');
		preview.classList.toggle('d-none', show !== 'preview');

		document.querySelectorAll('button[data-show]').forEach(function (btn) {
			btn.classList.toggle('active', show === btn.getAttribute('data-show'));
		});

		if (show !== 'preview') return;

		var imageRule = /^\(.+\.(jpg|png)\)$/

		preview.innerHTML = description.value
			.replace(/\+\+(.+)\+\+/g, '<strong>$1</strong>')
			.replace(/\-\-(.+)\-\-/g, '<i>$1</i>')
			.replace(/\(?(https:\/\/[a-z\-.\/]+)\)?/g, function (string, link) {
				return (
					imageRule.test(string) ?
						`<img src="${link}"/>`
						:
						`<a href="${link}">${link}</a>`
				);
			})
		;
	});
});