import React, { Component } from 'react';
import Map from './Components/Map';
import { Button, Input, notification } from 'antd';

export default class Cars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: {
				leuven1: [ [ 50.879, 4.6997 ], 13 ],
				leuven2: [ [ 50.874, 4.6947 ], 13 ],
				brussels: [ [ 50.8505, 4.35149 ], 11 ],
				ghent: [ [ 51.0514, 3.7103 ], 12 ],
				coast: [ [ 51.2214, 2.9541 ], 10 ]
			}
		};
	}

	handleClick = ({ event, latLng, pixel }) => {
		console.log('Map clicked!', latLng, pixel);
	};

	handleMarkerClick = ({ event, payload, anchor }) => {
		console.log(`Marker #${payload} clicked at: `, anchor);
	};

	render() {
		const { markers } = this.state;
		return (
			<div className="cars">
				<Map handleClick={this.handleClick} markers={markers} handleMarkerClick={this.handleMarkerClick} />
			</div>
		);
	}
}
