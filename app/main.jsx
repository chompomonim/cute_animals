import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col} from 'react-bootstrap';
import {PageHeader, Nav, NavItem} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

import {Item} from './components/items.jsx';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            limit: 12,
            query: 'Puppies+Kittens',
            likes: 0,
            animate: false
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
        });
    }

    handleSelect (selectedKey) {
        event.preventDefault();
        this.setState({
            query: selectedKey
        });
        this.loadData(selectedKey)
    }

    likeMe () {
        this.setState({
            likes: this.state.likes + 1
        })
    }

    animateItems () {
        this.setState({
            animate: !this.state.animate
        })
    }

    render () {
        return (
            <Grid>
                <Row style={{'marginBottom': '1em'}}>
                    <PageHeader>Kittens and Puppies
                        <small> Likes: {this.state.likes} </small>
                    </PageHeader>
                    <Nav bsStyle="tabs"
                         activeKey={this.state.query}
                         onSelect={this.handleSelect.bind(this)} >
                        <NavItem eventKey={'Kittens'} title="Kittens">Kittens</NavItem>
                        <NavItem eventKey={'Puppies'} >Puppies</NavItem>
                        <NavItem eventKey={'Puppies+Kittens'} >Together</NavItem>
                        <div className="pull-right">
                            <Input type="checkbox"
                                   label="Animate"
                                   onClick={this.animateItems.bind(this)} />
                        </div>
                    </Nav>
                </Row>
                <Row className="show-results">
                    {this.state.gifs.map((item) =>
                        <Item key={item.id}
                              id={item.id}
                              name={item.slug}
                              source={item.source_tld}
                              source_url={item.source_post_url}
                              img_url_still={item.images.fixed_height_small_still.url}
                              img_url={item.images.fixed_height_small.url}
                              animate={this.state.animate}
                              clickButton={this.likeMe.bind(this)} />
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
