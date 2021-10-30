import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";


//#### IMPORTANT:--
//#### rafce
//#### useState hook is like variable to store data 
//#### To use localStorage, we have to add useEffect hook.
//#### useEffect Hook is to eliminate the side-effects of using class-based components. 
//#### For example, tasks like updating the DOM, fetching data from API end-points, and
//#### setting up subscriptions or timers, etc can be lead to unwarranted side-effects.
//#### npm run start:dev


const Home = () => {
  //set initial state for users == blank array.
  const [users, setUser] = useState([]);

  // ##### now use loadUsers, in useEffect Hook.
  // in useEffect we add [] square bracket last, 
  // bcz we have to given 0 dependency otherwise loop run infinite time so.
  useEffect(() => {
    loadUsers();
  }, []);


  // ##### getrequest / getdata
  // console.log(result, "get request Return");
  // console.log(result.data, "get result DATA");
  //Now we get data, and we also check data from chrome extension "components", 
  // then click home, see hooks and click state.
  // here we write reverse() to use Show / add post Request data in reverse order
  // means new data shows in first position.
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };


  // ##### delete Request / delete user
  // Simple DELETE request with axios
  const deleteUser = async (id) => {
    // alert(id);
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

 
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>  View  </Link>
                  <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>  Edit </Link>
                  {/* <Link className="btn btn-danger" onClick={() => deleteUser(user.id)}> Delete  </Link> */}
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}> Delete  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;