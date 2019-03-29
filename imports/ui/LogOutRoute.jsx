import React from 'react';
import { Redirect } from 'react-router-dom';

export default LogOutRoute = (props) => {
	const { path } = props;
	if (path === '/logout') {
		Meteor.logout((err) => {
			if (!err) {
				return <Redirect to={'/login'} />;
			}
		});
	}
	return null;
};