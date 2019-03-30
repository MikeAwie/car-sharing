import React, { Component } from 'react';
import { Popover, Button } from 'antd';

export default class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false,
			visible: false
		};
	}

	handleVisibleChange = (visible) => {
		this.setState({ visible });
	};

	eventParameters = (event) => ({
		event,
		anchor: this.props.anchor,
		payload: this.props.payload
	});

	handleClick = (event) => {
		this.props.onClick && this.props.onClick(this.eventParameters(event));
	};

	handleBook = (event) => {
		this.setState({
			visible: false
		});
		this.props.onBook && this.props.onBook(this.eventParameters(event));
	};

	handleContextMenu = (event) => {
		this.props.onContextMenu && this.props.onContextMenu(this.eventParameters(event));
	};

	handleMouseOver = () => {
		this.setState({ hover: true });
	};

	handleMouseOut = () => {
		this.setState({ hover: false });
	};

	render() {
		const { left, top, onClick } = this.props;
		const { hover } = this.state;
		const toBeAdded = this.props.payload === 'toBeAdded';
		const { bookingCar, adding } = this.props;
		let booking = false;
		if (this.props.payload === 'book' || (bookingCar && this.props.payload === bookingCar.payload)) {
			booking = true;
		}
		let showPopover = true;
		if (adding) {
			showPopover = false;
		}
		if (bookingCar) {
			showPopover = false;
		}
		let src;
		if (toBeAdded) {
			src = '/blueCar.png';
		} else if (booking) {
			src = '/greenCar.png';
		} else {
			src = hover ? '/redCar.png' : 'yellowCar.png';
		}
		const style = {
			transform: 'translate(-50%,-50%)',
			left: '50%',
			top: '0%',
			position: 'absolute',
			cursor: onClick ? 'pointer' : 'default'
		};

		return (
			<div style={{ position: 'absolute', left, top }}>
				<Popover
					trigger="click"
					content={
						<Button type="primary" onClick={this.handleBook}>
							Book
						</Button>
					}
					visible={showPopover ? this.state.visible : false}
					onVisibleChange={showPopover && this.handleVisibleChange}
				>
					<div
						style={style}
						className="pigeon-click-block"
						onClick={this.handleClick}
						onContextMenu={this.handleContextMenu}
						onMouseOver={this.handleMouseOver}
						onMouseOut={this.handleMouseOut}
					>
						<img src={src} width={48} height={48} />
					</div>
				</Popover>
			</div>
		);
	}
}
