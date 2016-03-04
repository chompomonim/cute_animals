// Action Types
const LIKE_ITEM = 'LIKE_ITEM';
const DISLIKE_ITEM = 'DISLIKE_ITEM';
const INCREASE_LIKES = 'INCREASE_LIKES';
const DECREASE_LIKES = 'DECREASE_LIKES';


// Actions Creators
export function likeItem(item_id) {
    return {
        type: LIKE_ITEM,
        id: item_id
    }
}

