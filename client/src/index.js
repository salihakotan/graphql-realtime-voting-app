import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { server } from './apollo';
import { Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={server}>
  <Router>
    <App />
    </Router>
    </ApolloProvider>
);
