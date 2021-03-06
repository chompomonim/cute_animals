// Actions Creators
export function likeItem(item_id, images) {
    return {
        type: 'LIKE_ITEM',
        id: item_id,
        images: images
    }
}

export function animateItem(item_id) {
    return {
        type: 'ANIMATE_ITEM',
        id: item_id
    }
}

export function updateGifsList(data, pagination) {
    return {
        type: "LOAD_DATA",
        data: data,
        pagination: pagination
    }
}

export function hideModal() {
    return {
        type: 'HIDE_MODAL',
        id: undefined
    }
}

export function showModal(img_url) {
    return {
        type: 'SHOW_MODAL',
        img_url: img_url

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

export function showLikedItems(items) {
    return {
        type: 'SHOW_LIKED_ITEMS',
        data: items
    }
}

export function updatePagination(page) {
    return {
        type: 'UPDATE_PAGINATION',
        page: page
    }
}
