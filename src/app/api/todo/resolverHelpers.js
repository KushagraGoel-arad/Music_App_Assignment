import { GraphQLError } from "graphql";

const deleteTodoHelper = (id, allTodos) => {
  for (let i = 0; i < allTodos.length; i++) {
    if (allTodos[i]["id"] == id) {
      allTodos.splice(i, 1);
      return "Success Fully Deleted Todo " + id;
    }
  }

  throw new GraphQLError("Id does not exist.", {
    extensions: {
      code: "NOT_FOUND",
    },
  });
};

const DAYS = new Set([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
const LEVELS_OF_EFFORT = new Set(["easy", "moderate", "hard"]);
const PRIORITY = new Set(["low", "medium", "high"]);
const TODO_STATUS = new Set(["backlog", "todo", "doing", "done"]);

const createTodoHelper = (
  { title, dueDay, client, levelOfEffort, priority, todoStatus },
  allTodos
) => {
  if (!DAYS.has(dueDay)) {
    throw new GraphQLError("Invalid day. Choose from: " + Array.from(DAYS), {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  if (!LEVELS_OF_EFFORT.has(levelOfEffort)) {
    throw new GraphQLError(
      "Invalid Level of Effort. Choose from: " + Array.from(LEVELS_OF_EFFORT),
      {
        extensions: {
          code: "BAD_REQUEST",
        },
      }
    );
  }

  if (!PRIORITY.has(priority)) {
    throw new GraphQLError("Invalid Priority. Choose from: " + Array.from(PRIORITY), {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  if (!TODO_STATUS.has(todoStatus)) {
    throw new GraphQLError("Invalid Todo Status. Choose from: " + Array.from(TODO_STATUS), {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  let new_id;

  // Handling allTodos empty case
  if (allTodos.length == 0) {
    new_id = 0;
  } else {
    new_id = allTodos.at(-1).id + 1;
  }

  const new_todo = {
    id: new_id,
    title: title,
    dueDay: dueDay,
    client: client,
    levelOfEffort: levelOfEffort,
    priority: priority,
    todoStatus: todoStatus,
  };

  allTodos.push(new_todo);

  return new_todo;
};

const changeStatusHelper = (id, newStatus, allTodos) => {
  if (!TODO_STATUS.has(newStatus)) {
    throw new GraphQLError("Invalid Todo Status. Choose from: " + Array.from(TODO_STATUS), {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  for (let i = 0; i < allTodos.length; i++) {
    if (allTodos[i]["id"] == id) {
      allTodos["todoStatus"] = newStatus;
      return "Success Changed Todo Status to " + newStatus;
    }
  }

  throw new GraphQLError("Id does not exist.", {
    extensions: {
      code: "NOT_FOUND",
    },
  });
};

export { deleteTodoHelper, createTodoHelper, changeStatusHelper };
