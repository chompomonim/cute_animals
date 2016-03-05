import {expect} from 'chai'
import store from '../app/store'
import { likeItem } from '../app/store/actions'

describe('Like item', function() {
    before(function() {
        store.subscribe(() => {})
    })

    it('should increese items count', function() {
        store.dispatch(likeItem('first'))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(1)
    })

    it('should increese items count again', function() {
        store.dispatch(likeItem('second'))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(2)
    })

    it('should increese likes counter', function() {
        expect(store.getState().likes).to.equal(2)
    })

    it('not increese items count when such item already exists', function() {
        store.dispatch(likeItem('first'))
        let count = Object.keys(store.getState().items).length
        expect(count).to.equal(2)
    })

    it('should decreese likes counter', function() {
        expect(store.getState().likes).to.equal(1)
    })

})
