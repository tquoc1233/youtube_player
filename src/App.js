import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import Interwind from './assets/images/Interwind.svg';
import Video from './components/Video';
import Search from './components/Search';
import Results from './components/Results';
import React, { Component } from 'react';

const API_URL = 'https://pipedapi.kavin.rocks';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results : [],
			video_id: '',
			is_show_more: false,
			search: '',
			next_page: '',
			channel_id: '',
			isLoading: false,
		}
		// Use to scroll to element
		this.myRef_video = React.createRef();
	}
	
	
	handle_search = (event) => {
		event.preventDefault();
		this.handle_isLoading(true);

		var txt_searh = event.target.txtSearch.value;
		if (txt_searh != '') {
			localStorage.setItem('searchTxt', txt_searh);
			this.get_video(txt_searh);
			this.setState({search: txt_searh});
		}
		
	}

	get_video = (txt_searh) => {
		axios.get(`${API_URL}/search?q=${txt_searh}&filter=all`)
			.then(res => {
				if (res.status == 200) {
					this.setState({results: res.data.items, channel_id : ''});
					this.handle_check_show_more(res.data.nextpage);
					this.handle_isLoading(false);
				}
				
			})
			.catch(error => {
				console.error('Error get video', error);
			})
	}

	handle_play = (e, url, is_video) => {
		e.preventDefault();
		if (!is_video) {
			this.handle_isLoading(true);
			// open channel
			axios.get(`${API_URL}${url}`)
			.then(res => {
				if (res.status == 200) {
					this.setState({results: res.data.relatedStreams, channel_id : res.data.id});
					this.handle_check_show_more(res.data.nextpage);
					this.handle_isLoading(false);
				}
				
			})
			.catch(error => {
				console.error('Error get video of chanel', error);
			})
		}
		else {
			var id = url.replace('/watch?v=', '');
			this.setState({video_id: id})
			window.scrollTo(0, this.myRef_video.current.offsetTop);
		}
		
	}
	handle_show_more = () => {
		this.handle_isLoading(true);
		var url = '';
		if (this.state.channel_id != '') {
			url = `${API_URL}/nextpage/channel/${this.state.channel_id}?nextpage=${this.state.next_page}`;
		}
		else {
			url = `${API_URL}/nextpage/search?nextpage=${this.state.next_page}&&q=${this.state.search}&filter=all`;
		}
		axios.get(url)
		.then(res => {
			if (res.status == 200) {
				var video_list = [];
				if (this.state.channel_id != '') {
					video_list = res.data.relatedStreams;
				}
				else {
					video_list = res.data.items;
				}
				this.setState({results: [...this.state.results, ...video_list]});
				this.handle_isLoading(false);
				this.handle_check_show_more(res.data.nextpage);
			}
			
		})
		.catch(error => {
			console.error('Error get video of chanel', error);
		})
	}

	handle_check_show_more = (nextpage) => {
		var flag_next_page = false;
		var next_page = '';
		if(nextpage !== 'null') {
			flag_next_page = true;
			next_page = nextpage;
		}
		this.setState({is_show_more: flag_next_page});
		this.setState({next_page: next_page});
	}

	handle_isLoading = (status) => {
		this.setState({isLoading: status});
	}
	
	componentDidMount() {
		const searchTxt_local_store = localStorage.getItem('searchTxt');
		this.get_video(searchTxt_local_store);
	}
	
	render() {
		
		
		// run get video
		// this.get_video(searchTxt_local_store);
		return (
			<Container>
				{this.state.isLoading ? 
					<div className="loading-popup">
						<img src={Interwind} />
					</div>
					: ''
				}
				<Row className="mt-2 text-center">
					<h1>Youtube Player</h1>
				</Row>
				<Search handle_search={this.handle_search} ref={this.myRef_video}/>
				<Video video_id={this.state.video_id} />
				<Results results={this.state.results} handle_play={this.handle_play} />
				{this.state.is_show_more && 
					(
						<Row className="mt-2 text-center">
							<Button onClick={this.handle_show_more}>Show more</Button>
						</Row>
					)
				}
				
			</Container>
		);
	}
	
}

export default App;
