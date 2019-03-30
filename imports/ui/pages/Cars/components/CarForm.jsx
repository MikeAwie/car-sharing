import React, { Component } from 'react';
import { AutoForm, ErrorField, TextField, BoolField } from 'uniforms-antd';
import CarSchema from './schema';
import { Button } from 'antd';

class CarForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onSubmit } = this.props;
		return (
			<AutoForm schema={CarSchema} onSubmit={onSubmit} id="car-form">
				<TextField name="make" />
				<ErrorField name="make" />

				<TextField name="model" />
				<ErrorField name="model" />

				<TextField name="year" />
				<ErrorField name="year" />

				<BoolField name="fueled" />
				<ErrorField name="fueled" />

				<Button type="primary" htmlType="submit">
					Add Car
				</Button>
			</AutoForm>
		);
	}
}

export default CarForm;
