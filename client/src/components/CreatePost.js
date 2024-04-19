import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    // Initialize state to hold form input values
    this.state = {
      topic: '',
      description: '',
      postCategory: ''
    };
  }

  // Handle input changes and update state accordingly
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//onsubmit methord
onSubmit = (e) => {
    e.preventDefault();

    const {topic,description,postCategory} = this.state;

    const data = {
        topic:topic,
        description:description,
        postCategory:postCategory
    }
    console.log(data)

    axios.post("/post/save",data).then((res)=>{
        if(res.data.success){
            this.setState(
                {
                    topic: '',
                    description: '',
                    postCategory: ''

                }
            )
        }
    })
}

  render() {
    return (
      <div>
        <h2>Create New Post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              className="form-control"
              name="topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Post Category</label>
            <input
              type="text"
              className="form-control"
              name="postCategory"
              value={this.state.postCategory}
              onChange={this.handleInputChange}
            />
          </div>
          <button className='btn btn-success' type="submit" style={{marginTop:'15px'}}onClick={this.onSubmit}>
            <i className='far fa-check-square'></i>
            &nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
