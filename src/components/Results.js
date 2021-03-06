import React, { Component } from "react";

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Results extends Component {
	render() {
		var {results} = this.props;
		return (
			<>
				<Row className="mt-5">
					<h1>Results</h1>
				</Row>
				<Row className="mt-2 mb-2">
					{results &&  results.map((item) => {
						var is_video = false;
						var btn_name = 'Open';
						if (item.subscribers == undefined) {
							is_video = true;
							btn_name = 'Play';
						}
						return(
							<Card style={{ width: '30%', cursor: "pointer" }} className="m-2" onClick={(e) => this.props.handle_play(e, item.url, is_video)}>
								<Card.Img variant="top" width="200" height="200" src={item.thumbnail} />
								<Card.Body >
									<Card.Title>{item.name ? item.name : item.title}</Card.Title>
									{is_video && 
										(
											<>
												<Card.Text>Date: {item.uploadedDate}</Card.Text>
												<Card.Text>Views: {item.views && String(item.views).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</Card.Text>
											</>
										)
									}
								</Card.Body>
							</Card>
						)
					})}
				</Row>
			</>
		)
	}
}

export default Results;