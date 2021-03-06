import React from 'react'
import store from '../store'
import ItemBox from './item.jsx'
import ItemModal from './item_modal.jsx'

import { hideModal } from '../store/actions';


class Items extends React.Component {

    componentDidMount () {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    render () {
        const state = store.getState()

        if (state.query === 'Liked' && state.likes === 0)
            var maybeInfoMessage = (
                <h2 className="text-warning text-center">
                    There are no liked items :(
                </h2>
            )

        return (
            <div className="items">
                {maybeInfoMessage}
                {state.gifs.map((item) =>
                    <ItemBox key={item.id}
                             item={state.items[item.id]}
                             id={item.id}
                             name={item.slug}
                             source={item.source_tld}
                             source_url={item.source_post_url}
                             images={item.images}
                             animateAll={state.animateAll} />
                )}

                <ItemModal show={Boolean(state.showModal)}
                           onHide={() => store.dispatch(hideModal())}
                           img_url={String(state.showModal)} />
        </div>
        )
    }
}

export default Items
