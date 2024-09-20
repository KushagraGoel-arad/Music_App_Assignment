
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/music', 
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default client;
