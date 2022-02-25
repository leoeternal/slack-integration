import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import "./User.css";
import { addUser } from "../../store/UserAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function User() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { userAdded } = useSelector((state) => state.user);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (userAdded) {
      navigate("/template");
    }
  }, [userAdded]);

  const sendData = () => {
    if (
      firstname === "" ||
      lastname === "" ||
      gender === "" ||
      email === "" ||
      mobilenumber === "" ||
      designation === ""
    ) {
      toast.warning("Fill Complete Deails");
    } else {
      const formData = {
        firstname,
        lastname,
        gender,
        email,
        mobilenumber,
        designation,
      };
      dispatch(addUser(formData));
      setFirstName("");
      setLastName("");
      setMobileNumber("");
      setGender("");
      setEmail("");
      setDesignation("");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="user-wrapper">
        <div className="user-header">
          <p id="title">Add New User</p>
          <p id="subtitle">It's quick and easy.</p>
        </div>
        <hr />
        <div className="user-namefield">
          <TextField
            style={{ width: "47%" }}
            id="filled-basic"
            label="First name"
            variant="filled"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            style={{ width: "47%" }}
            id="filled-basic"
            label="Surname"
            variant="filled"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          />
        </div>
        <div className="user-longfield">
          <TextField
            style={{ width: "98%" }}
            id="filled-basic"
            label="Email address"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="user-longfield">
          <TextField
            style={{ width: "98%" }}
            id="filled-basic"
            label="Mobile number"
            variant="filled"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobilenumber}
          />
        </div>
        <div className="user-longfield">
          <TextField
            style={{ width: "98%" }}
            id="filled-basic"
            label="Designation"
            variant="filled"
            onChange={(e) => setDesignation(e.target.value)}
            value={designation}
          />
        </div>
        <div className="user-longfield">
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel
                value="female"
                control={<Radio />}
                onChange={(e) => setGender(e.target.value)}
                label="Female"
              />
              <FormControlLabel
                onChange={(e) => setGender(e.target.value)}
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                onChange={(e) => setGender(e.target.value)}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="user-submitbutton">
          <Button onClick={sendData} color="error" variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default User;
