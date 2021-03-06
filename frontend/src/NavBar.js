import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from './Auth';

function NavBar(props) {

  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top mb-4">
      <Link className="navbar-brand" to="/">
        Google Book Search App
      </Link> 
      {
          auth0Client.isAuthenticated() &&
          <div>
            <Link className="btn btn-dark" id="Search" to="/search">Search</Link>
            <Link className="btn btn-dark" id="Saved" to="/saved">Saved</Link>
          </div>
        }
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" id="navSignInBtn" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div id="navSignOutBtn" >
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);