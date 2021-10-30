import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

// ##### Firstly, store user data in any state.

const AddUser = () => {
  let history = useHistory();
  // console.log(history, "history");

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",  
    phone: "",
    website: ""
  });

  // if this error happened: - 'username' is not defined  no-undef etc then do destruction / extract.
  //destruction / extract
  const { name, username, email, phone, website } = user;

  // ##### onInputChange
  const onInputChange = e => {
    //console.log(e.target.value);
    // here rest operator ...user --> meaning store existing data, bcz when we update any field, data may delete so.
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ##### post request / senddata --- ORG 
  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await axios.post("http://localhost:3003/users", user);
  //   //for redirection, we have to add useHistory Hook from react-router-dom.
  //   // after history push, we have to give location, where we want redirect like Homepage here / function navigateToHome.
  //   history.push("/");
  // };

  
  // ##### post request / senddata --- ORG 
  const onSubmit = async e => {
    e.preventDefault();
    console.log(user, "user data");
    // console.log(user, "index data");
    // console.log(user.id, "index length");
    // typeof value !== 'undefined' && value) 
    // console.log( typeof value, "typeof data");

    // condition if user is null/empty/0;
    if ( (user.name === '' || user.username === '' || user.email === '' ||  user.phone === ''  ||  user.website === ''  ) ) {
      alert("Please fill, All fields are mandatory!");
    }
    else {
      await axios.post("http://localhost:3003/users", user);
      history.push("/");
      // console.log(history, "history");
    }

  };


  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
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
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
