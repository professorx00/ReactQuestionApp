import React, { Component } from 'react';
import './animate.css';


class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  render() {

    return (
      this.props.saved === false ?
        (
          <div className="card mb-3" key={Math.random()} id={this.props.title}>
            <div className="row no-gutters" key={Math.random()}>
              <div className="col-md-4" key={Math.random()}>
                {this.props.imageLinks ? (
                  <img src={this.props.imageLinks.smallThumbnail} className="card-img img-thumbnail" alt={this.props.title} key={Math.random()}/>
                ) : (
                    <img src="./stock.jpg" className="card-img img-thumbnail" alt={this.props.title} key={Math.random()}/>
                  )}
              </div>
              <div className="col-md-8" key={Math.random()}>
                <div className="card-body" key={Math.random()}>
                  <div className="row" key={Math.random()}>
                    <div className="col-md-8" key={Math.random()}>
                      <h5 className="card-title" key={Math.random()}>Title: {this.props.title}</h5>
                      <p className="card-text" key={Math.random()}><small className="text-muted">{this.props.subtitle}</small></p>
                    </div>
                    <div className="col-md-4" key={Math.random()}>
                      <button key={Math.random()} className="btn btn-primary m-1" onClick={() => this.props.handleSaveClick(this.props)}>Save</button>
                      <a href={this.props.previewLink} className="btn btn-primary m-1" target="_blank" rel="noopener noreferrer" key={Math.random()}>View</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" key={Math.random()}>
                      {this.props.authors ? (
                        <div>
                          <p key={Math.random()}>Authors:</p>
                          {this.props.authors.map(author => (
                            <p key={Math.random()}>{author}</p>
                          ))}
                        </div>
                      ) : (
                          <div key={Math.random()}></div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="text-center animated fadeIn"><h3>{this.props.title} has been Saved!</h3></div>
        )

    )
  }
}

export default Books