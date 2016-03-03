import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col} from 'react-bootstrap';
import {PageHeader, Nav, NavItem} from 'react-bootstrap';

import {Item} from './components/items.jsx';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            limit: 12,
            query: 'Puppies+Kittens'
        };
    }

    componentDidMount () {
        let query = this.state.query;
        this.loadData(query);
    }

    loadData (query) {
        let limit = this.state.limit;
        let api_key = this.props.api_key;
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}`;

        $.get(url, (result) => {
            this.setState({
                gifs: result.data
            });
            console.log('Data loaded')
        });
    }

    handleSelect (selectedKey) {
        event.preventDefault();
        console.log(selectedKey);
        this.setState({
            query: selectedKey
        });
        this.loadData(selectedKey)
    }

    render () {
        console.log(this.state.query, this.state.limit)
        return (
            <Grid>
                <Row style={{'margin-bottom': '1em'}}>
                    <PageHeader>Kittens and Puppies</PageHeader>
                    <Nav bsStyle="tabs"
                         activeKey={this.state.query}
                         onSelect={this.handleSelect.bind(this)}
                         justified >
                        <NavItem eventKey={'Kittens'} title="Kittens">Kittens</NavItem>
                        <NavItem eventKey={'Puppies'} >Puppies</NavItem>
                        <NavItem eventKey={'Puppies+Kittens'} >Together</NavItem>
                    </Nav>
                </Row>
                <Row className="show-results">
                    {this.state.gifs.map((item) =>
                        <Item key={item.id}
                              id={item.id}
                              name={item.slug}
                              source={item.source_tld}
                              source_url={item.source_post_url}
                              img_url={item.images.fixed_height_small_still.url} />
                    )}
                </Row>
            </Grid>
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
