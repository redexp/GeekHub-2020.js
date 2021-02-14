import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import todos from '../store/todos';

function ToggleAll({items, setAllCompleted}) {
	const [completed, setCompleted] = useState(false);

	const toggleCompleted = useCallback(() => {
		setAllCompleted(!completed);
	}, [completed]);

	useEffect(() => {
		setCompleted(items.length > 0 && items.every(item => item.completed));
	}, [items]);

	return <>
		<input id="toggle-all" className="toggle-all" type="checkbox" checked={completed} onChange={toggleCompleted}/>
		<label htmlFor="toggle-all">Mark all as complete</label>
	</>;
}

export default connect(
	(state) => ({
		items: state.todos
	}),
	{
		setAllCompleted: todos.actions.setAllCompleted
	}
)(ToggleAll);