import $ from 'jquery';
import React from 'react';
import {Pagination} from 'react-bootstrap';
import store from '../store';
import { updateGifsList } from '../store/actions'


class Paginator extends React.Component {

    componentDidMount () {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    handleSelect (event, page) {
        event.preventDefault()
        const state = store.getState()
        let limit = state.limit
        let offset = state.limit * (page.eventKey - 1)
        let api_key = this.props.api_key
        let query = state.query
        let url = `${this.props.api_url}/search?q=${query}&api_key=${api_key}&limit=${limit}&offset=${offset}`

        if (query !== 'Liked') {
            $.get(url, (result) => {
                store.dispatch(updateGifsList(result.data, result.pagination))
            });
        } else {
            let pagination = {
                total_count: state.likes,
                count: state.likes % limit,
                offset: offset
            }
            store.dispatch({type: 'UPDATE_PAGINATION', pagination: pagination})
        }
    }

    render () {
        let state = store.getState()
        let items_count = Math.ceil(state.pagination.total_count / state.limit)
        if (items_count === 0)
            items_count = 1

        let active_page = 1
        if (state.pagination.offset > 0)
            active_page = Math.ceil(state.pagination.offset / state.limit) + 1

        return (
            <div className="text-center">
                <Pagination next
                            prev
                            bsSize="large"
                            items={items_count}
                            activePage={active_page}
                            maxButtons={5}
                            boundaryLinks
                            onSelect={this.handleSelect.bind(this)} />
            </div>
        )
    }
}

export default Paginator
