import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: ""
    };
  }

  handleClick = event =>{
    axios.get(`https://localhost:8081/getbooks/${this.state.search}`, (req,res)=>{
      console.log(res)
    })
    
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="form col-md-12">
            <label htmlFor="search">Search</label>
            <input type="text" className="form-control" id="search" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder="Search Title" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
        </div>
        {this.state.books.map(element=>{
          return(
            <div className="row">
              <div className="col">
                <div className="row">
                <div className="col-md-6"><h2>Title:</h2></div>
                <div className="col-md-6"><h4>Authors</h4></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
}
export default withRouter(Search);