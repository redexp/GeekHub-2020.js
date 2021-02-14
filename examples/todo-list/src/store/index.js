import {configureStore} from '@reduxjs/toolkit';
import todos from './todos';

export default configureStore({
	reducer: {
		todos: todos.reducer,
	}
})
