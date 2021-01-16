import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://capital-mastodon-23.hasura.app/v1/graphql'
});

const client = new ApolloClient({
    cache,
    link
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
