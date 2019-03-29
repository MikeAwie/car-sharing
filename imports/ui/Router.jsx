import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Home from './pages/Home';

import Register from './pages/Users/Register';
import Login from './pages/Users/Login';

export default () => (
	<App>
		<Route exact path="/" component={Home} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} />
	</App>
);
