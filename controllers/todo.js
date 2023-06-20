import mssql from "mssql";
import { sqlConfig } from "../db/config.js";
import withTryCatch from "../utility/withTryCatch.js";

// Get all todos
export const getTodos = withTryCatch(async (req, res) => {
  const pool = await mssql.connect(sqlConfig);
  const request = pool.request();
  const result = await request.query("SELECT * FROM Todos");
  res.send(result.recordset);
});

// Get a single todo by ID
export const getTodoById = withTryCatch(async (req, res) => {
  const { id } = req.params;
  const pool = await mssql.connect(sqlConfig);
  const request = pool.request();
  const result = await request
    .input("id", mssql.Int, id)
    .query("SELECT * FROM Todos WHERE Id = @id");

  if (result.recordset.length === 0) {
    res.status(404).send("Todo not found");
  } else {
    res.send(result.recordset[0]);
  }
});

// Create a new todo
export const createTodo = withTryCatch(async (req, res) => {
  const { title, completed } = req.body;
  const pool = await mssql.connect(sqlConfig);
  const request = pool.request();
  const result = await request
    .input("title", mssql.NVarChar(255), title)
    .input("completed", mssql.Bit, completed)
    .query("INSERT INTO Todos (Title, Completed) VALUES (@title, @completed)");
  if (result.rowsAffected[0] === 0) {
    res.status(404).send("Todo node found");
  } else {
    res.send("Todo created successfully");
  }
});

// Update an existing todo
export const updateTodo = withTryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const pool = await mssql.connect(sqlConfig);
  const request = pool.request();
  const result = await request
    .input("id", mssql.Int, id)
    .input("title", mssql.NVarChar(255), title)
    .input("completed", mssql.Bit, completed)
    .query(
      "UPDATE Todos SET Title = @title, Completed = @completed WHERE Id = @id"
    );

  if (result.rowsAffected[0] === 0) {
    res.status(404).send("Todo not found");
  } else {
    res.send("Todo updated successfully");
  }
});

// Delete a todo
export const deleteTodo = withTryCatch(async (req, res) => {
  const { id } = req.params;
  const pool = await mssql.connect(sqlConfig);
  const request = pool.request();
  const result = await request
    .input("id", mssql.Int, id)
    .query("DELETE FROM Todos WHERE Id = @id");

  if (result.rowsAffected[0] === 0) {
    res.status(404).send("Todo not found");
  } else {
    res.send("Todo deleted successfully");
  }
});
