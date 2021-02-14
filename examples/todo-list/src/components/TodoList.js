import React from 'react';
import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import todos from '../store/todos';

class TodoList extends React.PureComponent {
	state = {
		items: [],
	};

	componentDidMount() {
		this.updateItems();
	}

	componentDidUpdate(prev) {
		const {filter, id, items} = this.props;

		if (filter !== prev.filter || id !== prev.id || items !== prev.items) {
			this.updateItems();
		}
	}

	updateItems() {
		const {filter, id} = this.props;
		let {items} = this.props;

		switch (filter) {
		case 'all':
			break;
		case 'active':
			items = items.filter(item => !item.completed);
			break;
		case 'completed':
			items = items.filter(item => item.completed);
			break;
		case 'todo':
			items = [items.find(item => item.id === Number(id))];
			break;
		}

		this.setState({items});
	}

	onEdit = (todo) => {
		const {history} = this.props;

		history.push(`/todo/${todo.id}/edit`);
	};
	onStopEdit = (todo) => {
		const {history} = this.props;

		history.push(`/todo/${todo.id}`);
	};

	onChangeCompleted = (todo, completed) => {
		const {setCompleted} = this.props;

		setCompleted({id: todo.id, completed});
	};

	onChangeTitle = (todo, title) => {
		const {setTitle} = this.props;

		setTitle({id: todo.id, title});
	};

	onRemove = (todo) => {
		const {remove} = this.props;

		remove(todo.id);
	};

	render () {
		const {items} = this.state;
		const {id, edit} = this.props;

		return (
			<ul className="todo-list">
				{items.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						edit={edit && todo.id === id}
						onEdit={this.onEdit}
						onStopEdit={this.onStopEdit}
						onChangeCompleted={this.onChangeCompleted}
						onChangeTitle={this.onChangeTitle}
						onRemove={this.onRemove}
					/>
				))}
			</ul>
		);
	}
}

export default connect(
	(state) => ({
		items: state.todos
	}),
	{
		...todos.actions,
	}
)(TodoList);