import React from 'react';
import { Link, NavLink } from "react-router-dom";


const PageNotFound = () => {

  return (
    <div className="notfound">
      <div className="content text-center">
        <div className="contentalign">
          <h1 className="display-4 col-md-12">Oops!! Page Not Found... </h1>
          <Link exact className="gotohomebtn btn btn-warning btn-sm" to="/">Back to Home </Link>
        </div>        
      </div>     
    </div>    
  );
};

export default PageNotFound;