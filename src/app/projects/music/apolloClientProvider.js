// ApolloClientProvider.js
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloClientProvider;
