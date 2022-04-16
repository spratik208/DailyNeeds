import React from "react";
import axios from "axios";
import { useState } from "react";
import { url } from "./Common/constants";
import { useHistory } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [role, setrole] = useState("");
  const [tc, settc] = useState(false);

  const history = useHistory();

  const HandleSubmit = () => {
    if (password.length >= 8) {
      //   setBtnDisabled(false);
      const user = {
        firstName,
        lastName,
        email,
        contact,
        password,
        role,
      };
      console.log(user);
      axios
        .post(url + "/register", user)
        .then((response) => {
          console.log("Printing user data", response.status);
          alert("Registration Successfull!");

          history.push("/login");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      //   setBtnDisabled(true);
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle regback">
      <div className="container position-absolute top-50 start-50 translate-middle regform">
        <div className="p-5 text-black fw-bold">
          <h1>Register</h1>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                value={firstName}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col px-5">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                value={lastName}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="email" className="form-label">
                Email{" "}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col px-5">
              <label htmlFor="contact" className="form-label">
                Contact{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                value={contact}
                onChange={(e) => {
                  setcontact(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                minlength={8}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col px-5">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="city" className="form-label">
                Role
              </label>
              <select
                name="roles"
                id="roles"
                className="input-fields-mod form-control"
                onChange={(e) => {
                  setrole(e.target.value);
                }}
              >
                <option value="" hidden>
                  Choose Role
                </option>
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">VENDOR</option>
              </select>
            </div>
            <div className="mb-3 col px-5"></div>
          </div>
          <div>
            <input
              className="form-check-input mx-2"
              type="checkbox"
              value={tc}
              onChange={(e) => {
                settc(e.target.value);
              }}
            />
            <label htmlFor="tc" className="form-label">
              Term And Conditions
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={HandleSubmit}
            disabled={password.length >= 8 ? false : true}
            style={{ cursor: password.length >= 8 ? "pointer" : "arrow" }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
