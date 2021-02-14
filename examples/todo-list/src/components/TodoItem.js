import React from 'react';

const ENTER = 13;
const ESC = 27;

export default class TodoItem extends React.PureComponent {
	editInput = React.createRef();

	componentDidUpdate() {
		if (this.props.edit) {
			this.editInput.current.focus();
		}
	}

	onEdit = () => {
		const {todo, onEdit} = this.props;

		onEdit(todo);
	};
	onChangeCompleted = (e) => {
		const {todo, onChangeCompleted} = this.props;

		onChangeCompleted(todo, e.target.checked);
	};
	onChangeTitle = (e) => {
		const {todo, onChangeTitle} = this.props;

		onChangeTitle(todo, e.target.value);
	};
	onRemove = () => {
		const {todo, onRemove} = this.props;

		onRemove(todo);
	};

	onInputKeyUp = (e) => {
		if (e.keyCode !== ESC && e.keyCode !== ENTER) return;

		const {todo, onStopEdit} = this.props;

		onStopEdit(todo);
	};

	render() {
		const {todo, edit} = this.props;

		return (
			<li className={edit ? 'editing' : todo.completed ? "completed" : ''}>
				<div className="view" onDoubleClick={this.onEdit}>
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.onChangeCompleted}
					/>
					<label>{todo.title}</label>
					<button className="destroy" type="button" onClick={this.onRemove}/>
				</div>

				<input
					ref={this.editInput}
					className="edit"
					defaultValue={todo.title}
					onInput={this.onChangeTitle}
					onKeyUp={this.onInputKeyUp}
				/>
			</li>
		);
	}
}