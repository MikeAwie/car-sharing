import React from 'react';
import { Route, Switch } from 'react-router';
import LogOutRoute from './LogOutRoute';
import App from './App';
import Home from './pages/Home';

import Register from './pages/Users/Register';
import Login from './pages/Users/Login';

import CarsMap from './pages/Cars/CarsMap';

export default () => (
	<App>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<LogOutRoute path={'/logout'} />
			<Route exact path="/cars" component={CarsMap} />
		</Switch>
	</App>
);
