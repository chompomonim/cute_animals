import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const ItemModal = ({img_url, show, onHide}) =>
    <Modal bsSize="large"
           show={show}
           onHide={onHide}
           aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div className="text-center"><img src={img_url} /></div>
        </Modal.Body>
    </Modal>

ItemModal.propTypes = {
  img_url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default ItemModal
