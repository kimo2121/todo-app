import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "./userDetail.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "40%",
    left: "20%",
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserDetail({ item }) {
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${item.userId}`
    );
    const data = await response.json();
    setUser(data);
  };
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={`${classes.paper} each-user`}>
      <div>
        <p>ToDo ID </p> <p>{item.id}</p>
      </div>
      <div>
        <p>ToDo Title</p>
        <p>{item.title.slice(0, 20)}</p>
      </div>
      <div>
        <p>User ID Title</p>
        <p>ToDo Title {user.id}</p>
      </div>
      <div>
        <p>Name</p>
        <p>{user.name}</p>
      </div>
      <div>
        <p>Email</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
          fetchUser();
        }}
        variant="contained"
        color="primary"
      >
        View User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
