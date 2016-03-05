import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { updateGifsList, setQuery, animateAll } from './store/actions'

import {Grid, Row, Col} from 'react-bootstrap';
import {PageHeader, Nav, NavItem} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import Item from './components/items.jsx';


class App extends React.Component {

    componentDidMount () {
        this.loadData(store.getState().query);
    }

    loadData (query) {
        let limit = store.getState().limit;
        let api_key = this.props.api_key;
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}`;

        $.get(url, (result) => {
            store.dispatch(updateGifsList(result.data))
        });
    }

    handleSelect (selectedKey) {
        event.preventDefault()
        store.dispatch(setQuery(selectedKey))
        this.loadData(selectedKey)
    }

    render () {
        let state = store.getState()
        return (
            <Grid>
                <Row style={{'marginBottom': '1em'}}>
                    <PageHeader>Kittens and Puppies
                        <small> Likes: {state.likes} </small>
                    </PageHeader>
                    <Nav bsStyle="tabs"
                         activeKey={state.query}
                         onSelect={this.handleSelect.bind(this)} >
                        <NavItem eventKey={'Kittens'} title="Kittens">Kittens</NavItem>
                        <NavItem eventKey={'Puppies'} >Puppies</NavItem>
                        <NavItem eventKey={'Puppies+Kittens'} >Together</NavItem>
                        <div className="pull-right">
                            <Input type="checkbox"
                                   label="Animate"
                                   onClick={() => store.dispatch(animateAll())} />
                        </div>
                    </Nav>
                </Row>
                <Row className="show-results">
                    {state.gifs.map((item) =>
                        <Item key={item.id}
                              id={item.id}
                              name={item.slug}
                              source={item.source_tld}
                              source_url={item.source_post_url}
                              images={item.images}
                              animate={state.animateAll} />
                    )}
                </Row>
            </Grid>
        )
    }
}

let api_key = 'dc6zaTOxFJmzC';   // Change me in live version.
let api_url = 'http://api.giphy.com/v1/gifs'

function render() {
    ReactDOM.render(
        <App store={store}
             api_key={api_key}
             api_url={api_url} />
        , document.getElementById('root')
    );
}

store.subscribe(render)
render()
