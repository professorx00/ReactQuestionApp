import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import SavedBooks from "../SavedBooks/SavedBooks"

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books:[]
    };
  }


  getBooks = ()=>{
    let name = auth0Client.getProfile().name
    axios.get(`http://localhost:8081/user/${name}`)
    .then(response=>{
      console.log(response.data)
      this.setState({
        books: response.data
      })
    })
    .catch(err=>console.log(err))
  }

  componentDidMount() {
    this.getBooks();
  }

  handleRemoveClick = (title)=>{
    console.log("remove Button clicked " + title)
    axios.post(`http://localhost:8081/removeUserBook`,{name:auth0Client.getProfile().name,title:title})
    .then(response=>{
      this.getBooks(); 
    })
    .catch(err=>console.log(err))
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col">
          {this.state.books.length ? (
            <div>
              {this.state.books.map(book => (
                <SavedBooks {...book} location="saved" handleRemoveClick={this.handleRemoveClick} getBooks={this.getBooks} key={Math.random()} />
              ))}
            </div>
          ) : (
              <div>
                <h1>No Books Found</h1>
              </div>
            )
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Saved;