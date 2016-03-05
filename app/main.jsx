import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import Items from './components/items.jsx';
import Navigation from './components/navigation.jsx';

const App = (props) =>
    <Grid>
        <Row style={{'marginBottom': '1em'}}>
            <PageHeader>Kittens and Puppies</PageHeader>
            <Navigation api_key={props.api_key}
                        api_url={props.api_url} />
        </Row>
        <Row className="show-results">
            <Items />
        </Row>
    </Grid>


let api_key = 'dc6zaTOxFJmzC';   // Change me in live version.
let api_url = 'http://api.giphy.com/v1/gifs'
ReactDOM.render(
    <App api_key={api_key}
         api_url={api_url} />
    , document.getElementById('root')
);
