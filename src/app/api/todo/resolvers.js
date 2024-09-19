import { deleteTodoHelper, createTodoHelper, changeStatusHelper } from "./resolverHelpers";

const allTodos = [
  {
    id: 0,
    title: "Complete React Todo",
    dueDay: "monday",
    client: "Sprinto",
    levelOfEffort: "easy",
    priority: "medium",
    todoStatus: "backlog",
  },
  {
    id: 1,
    title: "Read Graphql Primer",
    dueDay: "monday",
    client: "Sprinto",
    levelOfEffort: "moderate",
    priority: "high",
    todoStatus: "doing",
  },
];

const resolvers = {
  Query: {
    async allTodos(root, args) {
      return allTodos;
    },
  },
  Mutation: {
    async createTodo(root, todo_data) {
      return createTodoHelper(todo_data, allTodos);
    },
    async deleteTodo(root, { id }) {
      return deleteTodoHelper(id, allTodos); // Return true to indicate successful deletion
    },
    async changeStatus(root, { id, newStatus }) {
      return changeStatusHelper(id, newStatus, allTodos)
    }
  },
};

export default resolvers;
