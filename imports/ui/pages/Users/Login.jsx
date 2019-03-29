import React from 'react';
import { Link } from 'react-router-dom';
import { AutoForm, AutoField, ErrorsField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Login extends React.Component {
	constructor() {
		super();
	}

	handleLogin = (data) => {
		const { email, password } = data;
		Meteor.loginWithPassword(email, password, (err) => {
			if (!err) {
				return this.props.history.push('/');
			}
			alert(err.reason);
		});
	};

	render() {
		return (
			<div className="authentication">
				<AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
					<ErrorsField />

					<AutoField name="email" placeholder="Email" />

					<AutoField name="password" type="password" placeholder="Password" />

					<button type="submit">Login</button>
				</AutoForm>

			<Link to="register">Register</Link>
			</div>
		);
	}
}

const LoginSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	password: { type: String }
});
