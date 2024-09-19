import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});
export async function GET(request) {
  return handler(request);
}
export async function POST(request) {
  return handler(request);
}
