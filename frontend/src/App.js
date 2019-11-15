import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import NavBar from "./NavBar"
import Home from "./Home/Home"
import Callback from "./Callback"
import Saved from "./Saved/Saved"
import Search from "./Search/Search"
import SecuredRoute from "./SecuredRoute/SecuredRoute"
import auth0Client from './Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  handleSearchClick(){
    Redirect("/search")
  }
  handleSavedClick(){
    Redirect("/saved")
  }
  

  render() {
    return (
      <div>
        <NavBar handleSearchClick={this.handleSearchClick} handleSavedClick={this.handleSearchClick} />
        <Route exact path='/' component={Home} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/search'
          component={Search}
          checkingSession={this.state.checkingSession} />
        <SecuredRoute path='/saved'
          component={Saved}
          checkingSession={this.state.checkingSession} />
        
      </div>
    );
  }
}

export default withRouter(App);
