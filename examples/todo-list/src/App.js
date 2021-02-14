import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import AddTodo from './components/AddTodo';
import ToggleAll from './components/ToggleAll';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

import './assets/css/base.css';
import './assets/css/index.css';

export default function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<section className="todoapp">
					<header className="header">
						<h1>todos</h1>
						<AddTodo/>
					</header>

					<section className="main">
						<ToggleAll/>

						<Route
							exact
							path={[
								"/:filter(active|completed)?",
								"/:filter(todo)/:id(\\d+)/:edit(edit)?",
							]}
							render={({match: {params: {filter, id, edit}}, history}) => (
								<TodoList
									filter={filter || 'all'}
									id={id && Number(id)}
									edit={!!edit}
									history={history}
								/>
							)}
						/>

						<Footer/>
					</section>
				</section>
			</Provider>
		</BrowserRouter>
	);
};