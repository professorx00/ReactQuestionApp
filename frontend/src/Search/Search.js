import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Books from '../Books/Books'
import auth0Client from "../Auth"
import "../App.css"

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: ""
    };
  }

  handleSaveClick= (props)=> {
    console.log(props)
    const { title, subtitle, authors, publisher, publishedDate, previewLink, imageLinks, description } = props
    axios.post("/savebook", {
      title: title,
      subtitle: subtitle,
      authors: authors,
      publisher: publisher,
      publishedDate: publishedDate,
      previewLink: previewLink,
      imageLinks: imageLinks,
      description: description,
      user: auth0Client.getProfile()
    })
      .then(results => {
        let newBooks = []
        this.state.books.forEach(ele=>{
          if(ele.title===title){
            ele.saved=true;
            newBooks.push(ele)
          }else{
            newBooks.push(ele)
          }
        })
        this.setState({
          books:newBooks
        })
      })
      .catch(err => console.log(err))
  }

  handleClick = event => {
    console.log(this.state.search)
    axios.get(`/getbooks/${this.state.search}`).then((response) => {
      console.log(response)
      let data = []
      data = response.data.map(ele => {
        ele.volumeInfo.saved = false;
        return ele.volumeInfo
      })
      //this set state is working
      this.setState({
        books: [...data],
        search: ""
      })

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
      <div className="container mobileReady">
        <div className="row mb-4">
          <div className="form col-md-10">
            <label htmlFor="search">Search</label>
            <input type="text" className="form-control" id="search" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder="Search Title" />
          </div>
          <div className="col-md-2 align-self-end">
            <button type="submit" className="btn btn-primary"  onClick={this.handleClick} >Submit</button>
          </div>
        </div>
        {this.state.books.length ? (
          <div>
            {this.state.books.map(book => (
              <Books {...book} location="search" handleSaveClick={this.handleSaveClick} key={Math.random()} />
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