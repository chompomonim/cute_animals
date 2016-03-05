import React, { PropTypes } from 'react';

import { Col, Thumbnail } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import store from '../store';
import { likeItem, animateItem, hideModal, showModal } from '../store/actions'


const Item = ({id, name, images, source_url, source }) => {

    let state = store.getState()

    let liked = false
    let animate = false
    if (state.items[id]) {
      liked = state.items[id].liked
      animate = state.items[id].animate
    }

    if (state.animateAll)
        animate = true

    let url = images.fixed_height_small_still.url
    if (animate) url = images.fixed_height_small.url

    return <Col xs={12} sm={6} md={4} lg={3}>
        <Thumbnail src={url} alt={name}>
            <p>
              <b>Source: </b>
              <a href={source_url}>{source}</a>
            </p>
            <ButtonGroup>
                <Button bsStyle="success"
                        onClick={() => store.dispatch(likeItem(id))}
                        disabled={liked}>
                    {(liked) ? 'Liked' : 'Like'}
                </Button>
                <Button onClick={() => store.dispatch(showModal(id))}>Show</Button>
                <Button onClick={() => store.dispatch(animateItem(id))}>
                    {(animate) ? 'Stop animation' : 'Animate'}
                </Button>
            </ButtonGroup>
        </Thumbnail>

        <ItemModal show={state.showModal === id}
                   onHide={() => store.dispatch(hideModal())}
                   img_url={images.original.url} />
    </Col>
}


const ItemModal = ({img_url, show, onHide}) =>
    <Modal bsSize="large"
           show={show}
           onHide={onHide}
           aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center"><img src={img_url} /></div>
        </Modal.Body>
    </Modal>

ItemModal.propTypes = {
  img_url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}


export default Item
