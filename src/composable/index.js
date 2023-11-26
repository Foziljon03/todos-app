const apiUrl = "http://localhost:3000/todos";

export const fetchTodos = async () => {
  const response = await fetch(apiUrl);
  return response.json();
};

export const addNewTodo = async (title) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });

  return response.json();
};

export const deleteTodoById = async (id) => {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
};

export const updateTodo = async (todo) => {
  const response = await fetch(`${apiUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed,
    }),
  });

  return response.json();
};
