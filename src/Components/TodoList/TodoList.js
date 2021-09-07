import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Input } from "antd";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import "./todoList.css";
import UserDetail from "../UserDetail/UserDetail";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TodoList = () => {
  const onSearch = (value) => console.log(value);
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("asc");

  const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handekDsc = () => {
    setTodos(todos.sort((a, b) => b.id - a.id));
    setSort("dsc");
  };
  const handleAsc = () => {
    setTodos(todos?.sort((a, b) => a.id - b.id));
    setSort("asc");
  };

  const classes = useStyles();
  return (
    <div className="todo-list-component">
      <Search
        className={"search-component"}
        onChange={onChangeHandler}
        placeholder="Search for a presale by name..."
        style={{ marginBottom: "5vh" }}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10vw" }} align="left">
                ToDo Id <button onClick={handekDsc}>↑</button>
                <button onClick={handleAsc}>↓</button>
              </TableCell>
              <TableCell style={{ width: "fit-content" }} align="left">
                Title
              </TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(sort === "asc" || "dsc") &&
              todos
                .filter((value) => {
                  if (search === "") {
                    return value;
                  } else if (
                    value?.id === Number(search) ||
                    value?.completed
                      .toString()
                      .includes(search.toLowerCase()) ||
                    value?.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">
                      {item.title.slice(0, 40)}
                    </TableCell>
                    <TableCell align="left">
                      {item.completed ? "complete" : "incomplete"}
                    </TableCell>
                    <TableCell align="left">
                      <UserDetail item={item} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodoList;
