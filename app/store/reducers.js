const initialState = {
    gifs: [],
    limit: 12,
    query: 'Puppies+Kittens',
    likes: 0,
    items: {},
    showModal: undefined,
    animateAll: false,
}

function liked_items(items=[], likes=0, action) {
    switch (action.type) {
        case 'LIKE_ITEM':
            let liked = true
            if (items[action.id])
                liked = !items[action.id].liked
            let inc = (liked) ? 1 : -1

            return {
                items: Object.assign({}, items, {
                    [action.id]: { liked: liked }
                }),
                likes: likes + inc
            }
        default:
            return {items, likes}
    }
}

function cuteApp(state = initialState, action) {
    switch (action.type) {
        case 'LIKE_ITEM':
            let {items, likes} = liked_items(state.items, state.likes, action)
            return Object.assign({}, state, {
                likes: likes,
                items: items
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
