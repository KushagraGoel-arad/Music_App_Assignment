
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://music-app-assignment-zqab.vercel.app/projects/music', 
  cache: new InMemoryCache(),
});

export default client;
