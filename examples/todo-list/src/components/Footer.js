import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import todos from '../store/todos';

export default connect(
	(state) => ({
		items: state.todos
	}),
	{
		removeCompleted: todos.actions.removeCompleted
	}
)(Footer);

function Footer({items, removeCompleted}) {
	const [total, setTotal] = useState(0);
	const [active, setActive] = useState(0);
	const [completed, setCompeted] = useState(0);

	useEffect(() => {
		setTotal(items.length);
		setActive(items.reduce((sum, item) => sum + (item.completed ? 0 : 1), 0));
		setCompeted(items.reduce((sum, item) => sum + (item.completed ? 1 : 0), 0));
	}, [items]);

	if (total === 0) return null;

	return (
		<footer className="footer">
			<span className="todo-count"><strong>{active}</strong> item left</span>
			<ul className="filters">
				<li>
					<Link to="/">All</Link>
				</li>
				<li>
					<Link to="/active">Active</Link>
				</li>
				<li>
					<Link to="/completed">Completed</Link>
				</li>
			</ul>

			{completed > 0 &&
			<button onClick={removeCompleted} className="clear-completed">Clear completed</button>}
		</footer>
	);
}

function Link({to, children}) {
	return <NavLink exact to={to} activeClassName="selected">{children}</NavLink>
}