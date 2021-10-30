import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";


// ##### IMPORTANT:---
// ##### Update-Request / Edit-Request
// ##### Dynamic Routing to edit.
// ##### Edit: Edit User is same as Add User, we have to only

//Firstly, store user data in any state.

const EditUser = () => {
  // Assigning history
  let history = useHistory();

  // distruction to get id, which we have to update its data.
  const { id } = useParams();

  // To check alert data, follow below URL.
  //hint:--> http://localhost:3000/users/edit/4
  // alert(id, 'i am going to update!')
  // alert(id);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: ""
  });


  // if this error happened: - 'username' is not defined  no-undef etc then do destruction / extract.
  //destruction / extract
  // ##### onInputChange
  // here rest operator ...user --> meaning store existing data,
  // bcz when we update any field, data may delete so...
  const { name, username, email, phone, website } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // ##### now use loadUser, in useEffect Hook.
  // in useEffect we add [] square bracket last, 
  // bcz we have to given 0 dependency otherwise loop run infinite time so.
  useEffect(() => {
    loadUser();
  }, []);


  // ##### put request / senddata
  // method1: old js Technique --> still working
  // await axios.put("http://localhost:3003/users", user);
  // method2: new ES6 js Technique  --> still working
  //for redirection, we have to add useHistory Hook from react-router-dom.
  // after history push, we have to give location, where we want redirect like Homepage here / function navigateToHome.
  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, user);
    history.push("/");
  };

  // ##### Update-Request / Edit-Request
  // loadUser - to edit request
  // now To load User - we have requirement of 'useEffect hook'.
  // method1: old js Technique --> still working
  // const result = await axios.get("http://localhost:3003/users/" + id);
  // method2: new ES6 js Technique  --> still working.
  // how to get edit-parameter / edit-id in URL to update,
  // So we use useParams --> import { useParams } from 'react-router-dom'
  // console.log(result);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
    console.log(result.data, "result data");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Username"
              name="username"
              value={username}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Website Name"
              name="website"
              value={website}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
