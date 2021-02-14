import {createSlice} from '@reduxjs/toolkit';

let ID = 0;

export default createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (todos, {payload: todo}) => {
			todos.push({
				id: ++ID,
				completed: false,
				title: '',

				...todo,
			});
		},

		setCompleted: (todos, {payload: {id, completed}}) => {
			const todo = todos.find(todo => todo.id === id);
			todo.completed = completed;
		},

		setAllCompleted: (todos, {payload: completed}) => {
			todos.forEach(todo => todo.completed = completed);
		},

		setTitle: (todos, {payload: {id, title}}) => {
			const todo = todos.find(todo => todo.id === id);
			todo.title = title;
		},

		remove: (todos, {payload: id}) => {
			return todos.filter(todo => todo.id !== id);
		},

		removeCompleted: (todos) => {
			return todos.filter(todo => !todo.completed);
		},
	}
});