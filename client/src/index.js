import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { server } from './apollo';
import {   BrowserRouter as Router } from 'react-router-dom';
import {ChakraProvider} from "@chakra-ui/react"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={server}>
  <Router>
  <ChakraProvider>
  <React.Fragment>
    <App />
    </React.Fragment>
    </ChakraProvider>
    </Router>
    </ApolloProvider>
);
