import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../store/UserAction";
import { userAction } from "../../store/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import "./showUsers.css";
import { useNavigate, Link } from "react-router-dom";

function ShowUsers() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { users, userDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(userAction.updateUserAddedValue());
    dispatch(userAction.removeUserIdValue());
  }, []);

  useEffect(() => {
    if (userDeleted) {
      toast.success("User Deleted");
    }
    dispatch(getUsers());
    dispatch(userAction.updateUserDeletedValue());
  }, [userDeleted]);

  const usernameHandler = (id) => {
    dispatch(userAction.updateUserIdValue(id));
    navigate("/template");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="showusers">
        <h1>Users</h1>
        <div style={{ margin: "30px 0px 0px 0px" }}>
          {users.map((user) => (
            <div style={{ display: "flex", margin: "20px 0px 0px 0px" }}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => usernameHandler(user._id)}
              >
                {user.firstname} {user.lastname}
              </p>
              <p style={{ margin: "0px 0px 0px 10px", color: "grey" }}>
                {user.email}
              </p>
              <Button
                style={{ margin: "0px 0px 0px 10px", fontSize: "10px" }}
                size="small"
                variant="outlined"
                onClick={() => dispatch(deleteUser(user._id))}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowUsers;
