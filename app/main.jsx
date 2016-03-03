import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {List} from './components/list.jsx';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            limit: 10
        };
    }

    componentDidMount () {
        let limit = this.state.limit;
        let api_key = this.props.api_key;
        let query = 'Puppies';
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}`;

        this.serverRequest = $.get(url, (result) => {
            this.setState({
                gifs: result.data
            });
        });
    }

    render () {
        return (
            <List items={this.state.gifs} />
        )
    }
}


let api_key = 'dc6zaTOxFJmzC';   // Change me in live version.
let api_url = 'http://api.giphy.com/v1/gifs'
ReactDOM.render(
    <App api_key={api_key}
         api_url={api_url} />,
    document.getElementById('root')
);
