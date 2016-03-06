import $ from 'jquery';
import React from 'react';
import { Nav, NavItem, Input } from 'react-bootstrap';

import store from '../store';
import { updateGifsList, setQuery, animateAll, showLikedItems } from '../store/actions'


class Navigation extends React.Component {

    static get propTypes () {
        return {
            api_key: React.PropTypes.string.isRequired,
            api_url: React.PropTypes.string.isRequired
        };
    }

    componentDidMount () {
        this.loadData(store.getState().query);
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    loadData (query) {
        const state = store.getState()
        let limit = state.limit
        let offset = state.pagination.offset
        let api_key = this.props.api_key
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}&offset=${offset}`;

        $.get(url, (result) => {
            store.dispatch(updateGifsList(result.data, result.pagination))
        });
    }

    handleSelect (selectedKey) {
        event.preventDefault()
        store.dispatch(setQuery(selectedKey))
        this.loadData(selectedKey)
    }

    showLikedItems (event) {
        event.preventDefault()
        store.dispatch(showLikedItems(store.getState().items))
    }

    render() {
        let state = store.getState()

        return (
            <Nav bsStyle="tabs" activeKey={state.query}>
                <NavItem eventKey={'Puppies+Kittens'}
                         onClick={this.handleSelect.bind(this, 'Puppies+Kittens')}>Together</NavItem>
                <NavItem eventKey={'Kittens'}
                         onClick={this.handleSelect.bind(this, 'Kittens')}>Kittens</NavItem>
                <NavItem eventKey={'Puppies'}
                         onClick={this.handleSelect.bind(this, 'Puppies')}>Puppies</NavItem>
                <NavItem eventKey={'Liked'}
                         onClick={this.showLikedItems.bind(this)}>
                         <div className="text-danger">Liked items ({state.likes})</div>
                </NavItem>
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
