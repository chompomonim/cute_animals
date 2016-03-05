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
    let liked = false
    let animate = false
    let item = state[item_id]
    if (item) {
        liked = item.liked
        animate = item.animate
    }

    return {
        liked: liked,
        animate: animate
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
                    [action.id]: { liked: !item.liked, animate: item.animate }
                }),
                likes: likes + inc
            }
        case 'ANIMATE_ITEM':
            item = generateItem(action.id, state)
            return Object.assign({}, state, {
                [action.id]: {
                    liked: item.liked,
                    animate: !item.animate
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
                showModal: action.id
            })
        case 'SET_QUERY':
            return Object.assign({}, state, {
                query: action.query
            })
        case 'ANIMATE_ALL':
            return Object.assign({}, state, {
                animateAll: !state.animateAll
            })
        default:
            return state
    }
}

export default cuteApp
