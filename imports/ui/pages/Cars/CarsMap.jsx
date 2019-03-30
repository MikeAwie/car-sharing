import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Cars } from '/db';
import Map from './components/Map';
import CarForm from './components/CarForm';
import { Button, Input, notification } from 'antd';

class CarsMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adding: false,
			toBeAddedMarker: null
		};
	}

	handleClick = ({ event, latLng, pixel }) => {
		if (this.state.adding) {
			const { '0': lat, '1': lon } = latLng;
			this.setState({ toBeAddedMarker: { anchor: [ lat, lon ], payload: 'toBeAdded' } });
		}
	};

	onAdd = () => {
		this.setState({ adding: true });
	};

	onCancel = () => {
		this.setState({ adding: false, toBeAddedMarker: null });
	};

	onSubmit = (data) => {
		data.booked = false;
		data.location = { type: 'Point', coordinates: this.state.toBeAddedMarker.anchor.reverse() };
		Meteor.call('car.add', data, (err) => {
			if (!err) {
				notification.open({
					message: 'Car successfully added'
				});
				this.onCancel();
			} else {
				notification.open({
					message: err.message
				});
			}
		});
	};

	handleMarkerClick = ({ event, payload, anchor }) => {
		console.log(`Marker #${payload} clicked at: `, anchor);
	};

	render() {
		let { markers } = this.props;
		const { adding, toBeAddedMarker } = this.state;
		if (adding && toBeAddedMarker) {
			markers = [ ...markers, toBeAddedMarker ];
		}
		return (
			<div className="cars">
				{adding ? (
					<div>
						<Button onClick={this.onCancel} icon="close">
							Cancel
						</Button>
						<br />
						Please select the location of the car:
					</div>
				) : (
					<Button onClick={this.onAdd} icon="environment">
						Add Car
					</Button>
				)}
				<Map
					handleClick={this.handleClick}
					markers={markers}
					handleMarkerClick={this.handleMarkerClick}
					center={toBeAddedMarker ? toBeAddedMarker.anchor : null}
					zoom={toBeAddedMarker && 15}
				/>
				{adding && <CarForm onSubmit={this.onSubmit} />}
			</div>
		);
	}
}

export default withTracker((props) => {
	const handle = Meteor.subscribe('cars');

	return {
		loading: !handle.ready(),
		markers: Cars.find({ booked: false }).fetch().map(({ _id, location }) => {
			return { anchor: location.coordinates.reverse(), payload: _id };
		}),
		...props
	};
})(CarsMap);
