import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Cars } from '/db';
import Map from './components/Map';
import CarForm from './components/CarForm';
import BookingForm from './components/BookingForm';
import { Button, notification } from 'antd';

class CarsMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adding: false,
			toBeAddedMarker: null,
			bookingCar: null,
			dropOffMarker: null
		};
	}

	handleClick = ({ event, latLng, pixel }) => {
		if (this.state.adding) {
			const { '0': lat, '1': lon } = latLng;
			this.setState({ toBeAddedMarker: { anchor: [ lat, lon ], payload: 'toBeAdded' } });
		} else if (this.state.bookingCar) {
			const { '0': lat, '1': lon } = latLng;
			this.setState({ dropOffMarker: { anchor: [ lat, lon ], payload: 'book' } });
		}
	};

	onAdd = () => {
		this.setState({ adding: true });
	};

	onCancel = () => {
		this.setState({
			adding: false,
			toBeAddedMarker: null,
			bookingCar: null,
			dropOffMarker: null
		});
	};

	onSubmit = (data) => {
		const { toBeAddedMarker } = this.state;
		if (!toBeAddedMarker) {
			notification.open({
				message: 'Select the location of the car on the map'
			});
			return;
		}
		data.booked = false;
		data.location = { type: 'Point', coordinates: toBeAddedMarker.anchor.reverse() };
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

	onBook = ({ event, payload, anchor }) => {
		this.setState({ bookingCar: { anchor, payload } });
	};

	onSubmitBooking = (data) => {
		const { bookingCar, dropOffMarker } = this.state;
		if (!dropOffMarker) {
			notification.open({
				message: 'Select the dropoff location on the map'
			});
			return;
		}
		data.booked = true;
		data.dropOff = { type: 'Point', coordinates: dropOffMarker.anchor.reverse() };
		Meteor.call('car.book', bookingCar.payload, data, (err) => {
			if (!err) {
				notification.open({
					message: 'Car successfully booked'
				});
				this.onCancel();
			} else {
				notification.open({
					message: err.message
				});
			}
		});
	};

	render() {
		let { markers } = this.props;
		const { adding, toBeAddedMarker, bookingCar, dropOffMarker } = this.state;
		if (adding && toBeAddedMarker) {
			markers = [ ...markers, toBeAddedMarker ];
		}
		if (bookingCar) {
			if (dropOffMarker) {
				markers = [ ...markers, dropOffMarker ];
			}
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
				) : bookingCar ? (
					<div>
						<Button onClick={this.onCancel} icon="close">
							Cancel
						</Button>
						<br />
						Please select the dropoff location:
					</div>
				) : (
					<Button onClick={this.onAdd} icon="environment">
						Add Car
					</Button>
				)}
				<Map
					handleClick={this.handleClick}
					onBook={this.onBook}
					markers={markers}
					adding={adding}
					bookingCar={bookingCar}
					handleMarkerClick={this.handleMarkerClick}
					center={toBeAddedMarker ? toBeAddedMarker.anchor : null}
					zoom={toBeAddedMarker && 15}
				/>
				{adding && <CarForm onSubmit={this.onSubmit} />}
				{bookingCar && <BookingForm onSubmit={this.onSubmitBooking} />}
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
