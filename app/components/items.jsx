import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import {ButtonGroup, Button} from 'react-bootstrap';


export const Item = ({id, name,
                      img_url, img_url_still,
                      source_url, source,
                      clickButton,
                      animate=false}) => {
    let url = img_url_still;
    if (animate)
        url = img_url;

    return <Col xs={6} md={3}>
        <Thumbnail src={url} alt={name}>
            <p>
              <b>Source: </b>
              <a href={source_url}>{source}</a>
            </p>
            <ButtonGroup>
                <Button bsStyle="success" onClick={clickButton}>Like</Button>
                <Button>Show bigger</Button>
                <Button>Animate</Button>
            </ButtonGroup>
        </Thumbnail>
    </Col>
}
