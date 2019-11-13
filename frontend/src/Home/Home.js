import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';



class Home extends Component {
  render() {
    return (
      <div className="container">
      {
        !auth0Client.isAuthenticated() &&
        <div>Please Sign In</div>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <h1 className="mr-2 text-white">{auth0Client.getProfile().name}</h1>
         <Link to="/search" className="btn btn-primary">Search For Books</Link>
         <Link to="/saved" className="btn btn-primary">Your Saved Books</Link>
        </div>
      }
    </div>
      
    );
  }
}

export default Home;