import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import {ButtonGroup, Button} from 'react-bootstrap';


export const Item = (props) =>
    <Col xs={6} md={3}>
        <Thumbnail src={props.img_url} alt={props.name}>
            <p>
              <b>Source: </b>
              <a href={props.source_url}>{props.source}</a>
            </p>
            <ButtonGroup>
                <Button bsStyle="success">Like</Button>
                <Button bsStyle="danger">Dislike</Button>
            </ButtonGroup>
        </Thumbnail>
    </Col>
