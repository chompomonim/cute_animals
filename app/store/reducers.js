const initialState = {
    gifs: [],
    limit: 12,
    query: 'Puppies+Kittens',
    likes: 0,
    items: {},
    showModal: undefined,
    animateAll: false,
}

function generateItem(item_id, state) {
    const initialItem = {
        liked: false,
        animate: false,
        images: {}
    }
    let item = (state[item_id]) ? state[item_id] : initialItem

    return {
        liked: item.liked,
        animate: item.animate,
        images: item.images
    }
}

function items(action, state={}, likes=0) {
    let item
    switch (action.type) {
        case 'LIKE_ITEM':
            item = generateItem(action.id, state)
            let inc = (!item.liked) ? 1 : -1

            return {
                liked_items: Object.assign({}, state, {
                    [action.id]: {
                        liked: !item.liked,
                        animate: item.animate,
                        images: action.images
                    }
                }),
                likes: likes + inc
            }
        case 'ANIMATE_ITEM':
            item = generateItem(action.id, state)
            return Object.assign({}, state, {
                [action.id]: {
                    liked: item.liked,
                    animate: !item.animate,
                    images: item.images
                }
            })
        default:
            return state
    }
}

function cuteApp(state = initialState, action) {
    switch (action.type) {
        case 'LIKE_ITEM':
            let {liked_items, likes} = items(action, state.items, state.likes)
            return Object.assign({}, state, {
                likes: likes,
                items: liked_items
            })
        case 'ANIMATE_ITEM':
            return Object.assign({}, state, {
                items: items(action, state.items)
            })
        case 'LOAD_DATA':
            return Object.assign({}, state, {
                gifs: action.data
            })
        case 'HIDE_MODAL':
            return Object.assign({}, state, {
                showModal: action.id
            })
        case 'SHOW_MODAL':
            return Object.assign({}, state, {
                showModal: action.img_url
            })
        case 'SET_QUERY':
            return Object.assign({}, state, {
                query: action.query
            })
        case 'ANIMATE_ALL':
            return Object.assign({}, state, {
                animateAll: !state.animateAll
            })
        case 'SHOW_LIKED_ITEMS':
            let gifs = Object.keys(action.data).map((item_id) => {
                return {
                    id: item_id,
                    images: action.data[item_id].images
                }
            })
            return Object.assign({}, state, {
                query: 'Liked',
                gifs: gifs
            })
        default:
            return state
    }
}

export default cuteApp
