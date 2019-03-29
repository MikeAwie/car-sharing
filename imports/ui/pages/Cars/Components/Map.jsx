import React, { Component } from 'react';
import { Button } from 'antd';

import Map from 'pigeon-maps';
import Marker from './Marker';

const lng2tile = (lon, zoom) => (lon + 180) / 360 * Math.pow(2, zoom);
const lat2tile = (lat, zoom) =>
	(1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom);

export default class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			center: [ 47.1667, 27.6 ],
			zoom: 12
		};
	}

	zoomIn = () => {
		this.setState({
			zoom: Math.min(this.state.zoom + 1, 18)
		});
	};

	zoomOut = () => {
		this.setState({
			zoom: Math.max(this.state.zoom - 1, 1)
		});
	};

	handleBoundsChange = ({ center, zoom, bounds, initial }) => {
		this.setState({ center, zoom });
	};

	render() {
		const { center, zoom } = this.state;
		const { markers } = this.props;
		return (
			<div style={{ textAlign: 'center', marginTop: 50 }}>
				<div style={{ maxWidth: '100%', margin: '0 auto' }}>
					<Map
						limitBounds="edge"
						center={center}
						zoom={zoom}
						provider={(x, y, z) => {
							const retina = typeof window !== 'undefined' && window.devicePixelRatio >= 2 ? '@2x' : '';
							return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${retina}.png`;
						}}
						onBoundsChanged={this.handleBoundsChange}
						onClick={this.props.handleClick}
						animate={true}
						metaWheelZoom={false}
						twoFingerDrag={false}
						zoomSnap={true}
						mouseEvents={true}
						touchEvents={true}
						minZoom={1}
						maxZoom={18}
						defaultWidth={600}
						height={400}
						boxClassname="pigeon-filters"
					>
						{Object.keys(markers).map((key) => (
							<Marker
								key={key}
								anchor={markers[key][0]}
								payload={key}
								onClick={this.props.handleMarkerClick}
							/>
						))}
					</Map>
				</div>
				<div>
					<Button onClick={this.zoomIn} icon="plus" />
					{'  '}
					<Button onClick={this.zoomOut} icon="minus" />
				</div>
			</div>
		);
	}
}
