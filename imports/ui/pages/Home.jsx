import React from 'react';

const Home = () => {
	return (
		<div>
			<h1>Car Sharing:</h1>
			<div>*Account system with Meteor accounts</div>
			<div>*Cars page: map with all cars not currently booked</div>
			<div>*Users can add a Car by selecting it's position on the Map and completing the necessary fields</div>
			<div>*User's can book a Car by clicking on the car on the map</div>
			<div>*To book a car a user has to select the dropOff location and the duration of the booking</div>
			<div>*The map is reactive using Meteor Pub/Sub</div>
			<div>*The default location of the map is the user's location, obtained from the IP address</div>
			<div>
				*The car's location is updated after the booking period to the drop off location by a cron job that runs
				every minute
			</div>
			<div>*The locations are saved as indexed GeoJSON objects</div>
		</div>
	);
};

export default Home;
