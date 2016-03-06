import {expect} from 'chai'
import { likeItem, animateItem, showLikedItems, updatePagination } from '../app/store/actions'

import { createStore } from 'redux';
import cuteApp from '../app/store/reducers';
var store = createStore(cuteApp)


let item_images = {
    "fixed_height_small":{
        "url":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/100.gif",
        "width":"194",
        "height":"100",
        "size":"145080",
        "mp4":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/100.mp4",
        "mp4_size":"92193",
        "webp":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/100.webp",
        "webp_size":"62676"
    },
    "fixed_height_small_still":{
        "url":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/100_s.gif",
        "width":"194",
        "height":"100"
    },
    "original":{
        "url":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/giphy.gif",
        "width":"350",
        "height":"180",
        "size":"268905",
        "frames":"10",
        "mp4":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/giphy.mp4",
        "mp4_size":"60442",
        "webp":"http:\/\/media2.giphy.com\/media\/QgcQLZa6glP2w\/giphy.webp",
        "webp_size":"136022"
    },
}

describe('Like item', function() {
    before(function() {
        store = createStore(cuteApp)
    })

    it('should increese items count', function() {
        store.dispatch(likeItem('first', item_images))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(1)
    })

    it('should save images into store after liking', function() {
        let images = store.getState().items['first'].images
        let fixed_height_small = images.fixed_height_small,
            fixed_height_small_still = images.fixed_height_small_still,
            original = images.original

        expect(fixed_height_small.url).to.equal("http://media2.giphy.com/media/QgcQLZa6glP2w/100.gif")
        expect(fixed_height_small_still.url).to.equal("http://media2.giphy.com/media/QgcQLZa6glP2w/100_s.gif")
        expect(original.url).to.equal("http://media2.giphy.com/media/QgcQLZa6glP2w/giphy.gif")
    })

    it('should increese items count again', function() {
        store.dispatch(likeItem('second', item_images))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(2)
    })

    it('should increese likes counter', function() {
        expect(store.getState().likes).to.equal(2)
    })

    it('not increese items count when such item already exists', function() {
        store.dispatch(likeItem('first', item_images))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(2)
    })

    it('should decreese likes counter', function() {
        expect(store.getState().likes).to.equal(1)
    })
})

describe('Animate item', function() {
    before(function() {
        store = createStore(cuteApp)
    })

    it('should set animate to true', function() {
        store.dispatch(animateItem('first'))
        expect(store.getState().items['first'].animate).to.equal(true)
    })

    it('should set animate to false when repeate on same item', function() {
        store.dispatch(animateItem('first'))
        expect(store.getState().items['first'].animate).to.equal(false)
    })
})

describe('Show liked items', function() {
    before(function() {
        store = createStore(cuteApp)
    })

    it('shold have proper likes counter', function() {
        store.dispatch(likeItem('first', item_images))
        store.dispatch(likeItem('second', item_images))
        store.dispatch(likeItem('third', item_images))
        expect(store.getState().likes).to.equal(3)
    })

    it('show liked items in gifs state', function() {
        store.dispatch(showLikedItems(store.getState().items))
        expect(store.getState().gifs.length).to.equal(3)
    })

})

describe('Test pagination', function() {
    before(function() {
        store = createStore(cuteApp)
    })

    it('offset should be 0 when less than 12 liked items', function() {
        let items = ["1", "2", "3"]
        for (let item of items) {
            store.dispatch(likeItem(item, item_images))
        }
        store.dispatch(showLikedItems(store.getState().items))
        expect(store.getState().pagination.total_count).to.equal(3)
        expect(store.getState().pagination.offset).to.equal(0)
    })

    it('go to second page should change offset', function() {
        let items = ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
        for (let item of items) {
            store.dispatch(likeItem(item, item_images))
        }
        store.dispatch(updatePagination(2))         // Go to second page
        expect(store.getState().pagination.offset).to.equal(12)
    })

    it('should show one item on second page', function() {
        let items_count = store.getState().gifs.length
        expect(items_count).to.equal(1)
    })

    it('should go to prev page when dislike last item on page', function() {
        store.dispatch(likeItem("13"))             // Dislike item by liking it again.
        expect(store.getState().pagination.offset).to.equal(0)
    })
})
