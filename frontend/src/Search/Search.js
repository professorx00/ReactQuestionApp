import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Books from '../Books/Books'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: ""
    };
  }

  handleClick = event => {
    axios.get(`http://localhost:8081/getbooks/${this.state.search}`).then((response) => {

      let data = []
      response.data.map(ele => {
        data.push(ele.volumeInfo)
      })
      console.log(data)
      this.setState({
        books: [...data],
        search: ""
      })
      console.log(this.state.book)
    }).catch(err => console.log(err))

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
        <div className="row mb-2">
          <div className="form col-md-10">
            <label htmlFor="search">Search</label>
            <input type="text" className="form-control" id="search" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder="Search Title" />
          </div>
          <div className="col-md-2 align-self-end">
            <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
          </div>
        </div>
        {this.state.books.length ? (
          <div>
            {this.state.books.map(book => (
              <Books {...book} key={Math.random()} />
            ))}
          </div>
        ) : (
            <div>
              <h1>No Books Found</h1>
            </div>
          )
        }
      </div>

    )
  }
}
export default withRouter(Search);