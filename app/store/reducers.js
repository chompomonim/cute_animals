// import { combineReducers } from 'redux';

const initialState = {
    currentPage: 1,
    itemsPerPage: 12,
    selectedFilter: 'Puppies_Kittens',
    likedItems: [],
    showItem: undefined,
    animateAll: false,
    items: []
}


function items(state=[], action) {
    let index = state.map((item) => item.id).indexOf(action.id);
    switch (action.type) {
        case 'LIKE_ITEM':
            if (index === -1)   // Add new element into array.
                return [...state, { id: action.id, liked: true}]
            else                // If element already in array, change it.
                return [
                    ...state.slice(0, index),
                    {
                        id: action.id,
                        liked: true,
                    },
                    ...state.slice(index + 1)
                ]
        default:
            return state
    }
}

function cuteApp(state = initialState, action) {
    switch (action.type) {
        case 'LIKE_ITEM':
            return Object.assign({}, state, {
                likedItems: [...state.likedItems, action.id],
                items: items(state.items, action)
            })
        default:
            return state
    }
}

export default cuteApp
