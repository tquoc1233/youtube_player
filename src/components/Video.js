import React, { Component } from "react";
import { Row } from 'react-bootstrap';
class Video extends Component {
	render() {
		var {video_id} = this.props;
		var url = '';
		if (video_id != '') {
			url = `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&mute=0&autohide=1&modestbranding=1&iv_load_policy=3&rel=0`;
		}
		return (
			<Row>
				{url && 
					<iframe width="1000" height="600" src={url} frameborder="0" allowfullscreen="true"></iframe>
				}
			</Row>
		)
	}
}

export default Video;