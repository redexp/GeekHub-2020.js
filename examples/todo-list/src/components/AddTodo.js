import React, {useCallback} from 'react';
import store from '../store';
import todos from '../store/todos';

const ENTER = 13;

export default function AddTodo() {

	const onKeyDown = useCallback(e => {
		if (e.keyCode !== ENTER) return;

		e.preventDefault();

		let title = e.target.value.trim();

		if (!title) return;

		store.dispatch(todos.actions.addTodo({title}));

		e.target.value = '';
	}, []);

	return (
		<input
			className="new-todo"
			placeholder="What needs to be done?"
			autoFocus
			onKeyDown={onKeyDown}
		/>
	);
}