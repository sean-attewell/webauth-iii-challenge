import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Container />
    </Router>,
    document.querySelector('#target'),
);
