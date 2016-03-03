import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import {ButtonGroup, Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


export const Item = ({id, name,
                      images,
                      source_url, source,
                      clickButton,
                      clickShowButton, onHide,
                      animate=false,
                      show=false }) => {

    let url = images.fixed_height_small_still.url;
    if (animate) url = images.fixed_height_small.url;

    return <Col xs={12} sm={6} md={4} lg={3}>
        <Thumbnail src={url} alt={name}>
            <p>
              <b>Source: </b>
              <a href={source_url}>{source}</a>
            </p>
            <ButtonGroup>
                <Button bsStyle="success" onClick={clickButton}>Like</Button>
                <Button onClick={clickShowButton}>Show bigger</Button>
                <Button>Animate</Button>
            </ButtonGroup>
        </Thumbnail>

        <ItemModal show={show} onHide={onHide}
                   img_url={images.original.url} />
    </Col>
}


export const ItemModal = ({img_url, show, onHide}) =>
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
