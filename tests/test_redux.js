import {expect} from 'chai'
import store from '../app/store'
import { likeItem, animateItem } from '../app/store/actions'

describe('Like item', function() {
    before(function() {
        this.unsubscribe = store.subscribe(() => {})
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

    after(function() {
        this.unsubscribe()
    })
})

describe('Animate item', function() {
    before(function() {
        store.subscribe(() => {})
    })

    it('should set animate to true', function() {
        store.dispatch(animateItem('first'))
        expect(store.getState().items['first'].animate).to.equal(true)
    })

    it('should set animate to false when repeate on same item', function() {
        store.dispatch(animateItem('first'))
        expect(store.getState().items['first'].animate).to.equal(false)
    })

    after(function() {
        this.unsubscribe()
    })
})