import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth0Client from '../Auth';



class Home extends Component {
  render() {
    return (
      <div className="container mobileReady">
        {
          !auth0Client.isAuthenticated() &&
          <div>
            <h1>Please Sign In</h1>
            <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
          </div>
        }
        {
          auth0Client.isAuthenticated() &&
          <div>
            <h1 className="mr-2 text-white">Welcome {auth0Client.getProfile().name}!</h1>
            <Link to="/search" className="btn btn-primary">Search For Books</Link><span> </span>
            <Link to="/saved" className="btn btn-primary">Your Saved Books</Link>
          </div>
        }
      </div>

    );
  }
}

export default Home;