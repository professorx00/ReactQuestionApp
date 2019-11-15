import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from './Auth';

function NavBar(props) {

  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Google Book Search App
       
      </Link> 
      {
          auth0Client.isAuthenticated() &&
          <div>
            <Link className="btn btn-dark mr-5 p-3" name="Search" to="/search">Search</Link>
            <Link className="btn btn-dark ml-5 p-3" name="Saved" to="/saved">Saved</Link>
          </div>
        }
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);