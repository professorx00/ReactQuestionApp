import React from 'react';
import axios from 'axios';
import auth0Client from "../Auth"



function Books({ title, subtitle, authors, publisher, publishedDate, previewLink, imageLinks, description }) {
  let authorsArray = authors!==undefined ? authors: ["Unknown"];

  function handleClick(event){
      axios.post("http://localhost:8081/savebook",{
        title:title,
        subtitle:subtitle,
        authors:authors,
        publisher:publisher,
        publishedDate:publishedDate,
        previewLink:previewLink,
        imageLinks:imageLinks,
        description:description,
        user:{
          name:auth0Client.getProfile(),
          idToken:auth0Client.getIdToken(),
          
        }
      })
      .then(results => {
        console.log(results)
      })
      .catch(err=>console.log(err))
  }


  return (
    <div className="card mb-3" key={Math.random()}>
      <div className="row no-gutters">
        <div className="col-md-4">
          {imageLinks ? (<img src={imageLinks.smallThumbnail} className="card-img img-thumbnail" alt={title} />) : (<img src="./stock.jpg" className="card-img img-thumbnail" alt={title} />)}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h5 className="card-title">Title: {title}</h5>
                <p className="card-text"><small className="text-muted">{subtitle}</small></p>
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary m-1" onClick={handleClick}>Save</button>
                <a href={previewLink} className="btn btn-primary m-1"  target="_blank">View</a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="card-text">By: {authorsArray.map(author => (<span>{author}</span>))}</p>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books