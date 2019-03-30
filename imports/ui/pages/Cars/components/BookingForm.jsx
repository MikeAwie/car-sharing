import SimpleSchema from 'simpl-schema';
import React from 'react';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import { Button } from 'antd';

const schema = new SimpleSchema({
	bookedUntil: Date
});

const BookingForm = ({ onSubmit }) => {
	return (
		<AutoForm schema={schema} onSubmit={onSubmit} id="booking-form">
			<AutoField name="bookedUntil" />
			<ErrorField name="bookedUntil" />

			<Button type="primary" htmlType="submit">
				Book Car
			</Button>
		</AutoForm>
	);
};

export default BookingForm;
