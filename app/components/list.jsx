import React from 'react';

const Item = (props) =>
    <li>
        <img src={props.img_url} alt={props.id} />
    </li>


export const List = (props) =>
    <ul>
        {props.items.map((item) =>
            <Item key={item.id} id={item.id} img_url={item.images.original.url} />
        )}
    </ul>
