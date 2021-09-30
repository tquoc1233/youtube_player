import React, { Component } from "react";

import { Container, Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';

class Search extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Row className="mt-2">
				<Col>
					<Form onSubmit={this.props.handle_search}>
						<InputGroup className="mb-3">
							<FormControl
							placeholder="Keyword"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							name="txtSearch"
							/>
							<Button type="submit">
							Search
							</Button>
						</InputGroup>
					</Form>
				</Col>
			</Row>
			
		)
	}
}

export default  Search;