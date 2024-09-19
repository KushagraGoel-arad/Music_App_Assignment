
const typeDefs = `#graphql

  type Todo {
      id: Int!
      title: String!
      dueDay: String
      client: String!
      levelOfEffort: String!
      priority: String!
      todoStatus: String!
  }
  
  type Query {
      allTodos: [Todo!]!
  }
  
  type Mutation {
      createTodo(
          title: String!
          dueDay: String
          client: String!
          levelOfEffort: String!
          priority: String!
          todoStatus: String!
          ): Todo!
      deleteTodo(
          id: Int!
      ): String!
      changeStatus(
        id: Int!
        newStatus: String!
      ): String!
  }
`;

export default typeDefs