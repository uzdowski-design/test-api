const express = require('express');
const app = express();
// Start with an initial array of to-dos, acting as a pseudo-database for demonstration.
let todos = [{ id: 1, task: 'Master Node.js' }];

// READ Operation: Get the list of to-dos.
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// CREATE Operation: Add a new to-do to the list.
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

// UPDATE Operation: Modify an existing to-do.
app.put('/todos/:id', (req, res) => {
  let todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) res.status(404).send('The todo with the given ID was not found');
  todo.task = req.body.task;
  res.send(todo);
});

// DELETE Operation: Remove a to-do from the list.
app.delete('/todos/:id', (req, res) => {
  const originalTodosLength = todos.length;
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  if (todos.length === originalTodosLength)
    res.status(404).send('The todo with the given ID was not found');
  res.send(todos);
});

app.listen(3000, () => {
  console.log('API is listening on http://localhost:3000');
});
