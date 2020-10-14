import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Task from './Task'

class App extends Component {
	render() {
		return (
			<div>
				<Task />
				<Router>
					<Switch>
						<Route exact path="/" component={Task} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;