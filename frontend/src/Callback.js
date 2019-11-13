import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import axios from "axios";


class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    const profile = auth0Client.getProfile()
    console.log(profile)
    let user={}
    if(profile.sub.split("|")[0]==="google-oauth2"){
      user = {
        name:profile.name,
        email:profile.email,
        googleID:profile.sub.split("|")[1]
      }
    }else if(profile.sub.split("|")[0]==="fitbit"){
      user={
        name:profile.name,
        fitbitID:profile.sub.split("|")[1]
      }
    }else {
      user={
        name: profile.nickname,
        email:profile.email,
        authOID:profile.sub.split("|")[1]
      }
      console.log(user)
    }
    console.log(user)
    axios.post("/user",user).then(data=>{
      
    }).catch(err=>console.log(err)).finally(()=>{
      this.props.history.replace('/search');
    })
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);