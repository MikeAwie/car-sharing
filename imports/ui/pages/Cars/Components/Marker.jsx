import React, { Component } from 'react';

export default class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};
	}

	eventParameters = (event) => ({
		event,
		anchor: this.props.anchor,
		payload: this.props.payload
	});

	handleClick = (event) => {
		this.props.onClick && this.props.onClick(this.eventParameters(event));
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
		const style = {
			transform: 'translate(-50%,-50%)',
			left: '50%',
			top: '0%',
			position: 'absolute',
			cursor: onClick ? 'pointer' : 'default'
		};

		return (
			<div style={{ position: 'absolute', left, top }}>
				<div
					style={style}
					className="pigeon-click-block"
					onClick={this.handleClick}
					onContextMenu={this.handleContextMenu}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
				>
					>
					<img src={hover ? '/redCar.png' : 'yellowCar.png'} width={48} height={48} />
				</div>
			</div>
		);
	}
}
