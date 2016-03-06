import React from 'react'
import { Button } from 'react-bootstrap';


const LikeButton = ({onLikeClick, liked}) =>
    <Button bsStyle={(liked) ? 'danger' : 'success'}
            onClick={onLikeClick} >
        {(liked) ? 'Dislike' : 'Like'}
    </Button>

export default LikeButton