import React from 'react';

import { Col, Thumbnail } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';

import store from '../store';
import { likeItem, animateItem, showModal } from '../store/actions';
import LikeButton from './like_button.jsx';

const Item = ({name, source_url, source, img_url, liked, animate,
               onLikeClick, onShowClick, onAnimateClick }) =>
        <Thumbnail src={img_url} alt={name}>
            <p>
              <b>Source: </b>
              <a href={source_url}>{source}</a>
            </p>
            <ButtonGroup>
                <LikeButton liked={liked} onLikeClick={onLikeClick} />
                <Button onClick={onShowClick}>Show</Button>
                <Button onClick={onAnimateClick}>
                    {(animate) ? 'Stop animation' : 'Animate'}
                </Button>
            </ButtonGroup>
        </Thumbnail>


const ItemBox = (props) => {
    const item = props.item
    let liked = false
    let animate = false
    if (item) {
        liked = item.liked
        animate = item.animate
    }

    if (props.animateAll)
        animate = true

    let original_img = props.images.original.url
    let img_url = props.images.fixed_height_small_still.url
    if (animate)
        img_url = props.images.fixed_height_small.url

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Item id={props.id}
                  name={props.name}
                  source={props.source}
                  source_url={props.source_url}
                  img_url={img_url}
                  liked={liked}
                  animate={animate}
                  onLikeClick={() => store.dispatch(likeItem(props.id, props.images))}
                  onShowClick={() => store.dispatch(showModal(original_img))}
                  onAnimateClick={() => store.dispatch(animateItem(props.id))} />
        </Col>
    )
}

export default ItemBox
