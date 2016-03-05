// Actions Creators
export function likeItem(item_id) {
    return {
        type: 'LIKE_ITEM',
        id: item_id
    }
}

export function animateItem(item_id) {
    return {
        type: 'ANIMATE_ITEM',
        id: item_id
    }
}

export function updateGifsList(data) {
    return {
        type: "LOAD_DATA",
        data: data
    }
}

export function hideModal() {
    return {
        type: 'HIDE_MODAL',
        id: undefined
    }
}

export function showModal(item_id) {
    return {
        type: 'SHOW_MODAL',
        id: item_id
    }
}

export function setQuery(query) {
    return {
        type: 'SET_QUERY',
        query: query
    }
}

export function animateAll() {
    return { type: 'ANIMATE_ALL' }
}
