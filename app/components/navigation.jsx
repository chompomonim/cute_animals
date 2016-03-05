import $ from 'jquery';
import React from 'react';
import { Nav, NavItem, Input } from 'react-bootstrap';

import store from '../store';
import { updateGifsList, setQuery, animateAll } from '../store/actions'


class Navigation extends React.Component {

    static get propTypes () {
        return {
            api_key: React.PropTypes.string.isRequired,
            api_url: React.PropTypes.string.isRequired
        };
    }
    constructor(props) {
        super(props)
        this.loadData(store.getState().query);
    }

    loadData (query) {
        let limit = store.getState().limit;
        let api_key = this.props.api_key;
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}`;

        $.get(url, (result) => {
            store.dispatch(updateGifsList(result.data))
            this.forceUpdate()
        });
    }

    handleSelect (selectedKey) {
        event.preventDefault()
        store.dispatch(setQuery(selectedKey))
        this.loadData(selectedKey)
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    render() {
        let state = store.getState()

        return (
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
        )
    }
}

export default Navigation
