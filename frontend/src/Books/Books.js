import React,{Component} from 'react';
// import axios from 'axios';
// import auth0Client from "../Auth"

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  render(){
    return(
      <div className="card mb-3" key={Math.random()}>
        <div className="row no-gutters">
          <div className="col-md-4">
            {this.props.imageLinks ? (
              <img src={ this.props.imageLinks.smallThumbnail}  className="card-img img-thumbnail" alt={this.props.title} />
              ):(
                <img src="./stock.jpg" className="card-img img-thumbnail" alt={this.props.title} />
            ) }
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="card-title">Title: {this.props.title}</h5>
                  <p className="card-text"><small className="text-muted">{this.props.subtitle}</small></p>
                </div>
                <div className="col-md-4"> 
                    <button className="btn btn-primary m-1" onClick={()=>this.props.handleSaveClick(this.props)}>Save</button>
                  <a href={this.props.previewLink} className="btn btn-primary m-1"  target="_blank" rel="noopener noreferrer">View</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                {this.props.authors ? (
                  <div>
                  <p>Authors:</p>
                  {this.props.authors.map(author=>(
                    <p>{author}</p>
                  ))}
                  </div>
                ):(
                  <div></div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Books