import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: []
    };
  }
  
  componentDidMount(){
    this.retrievePosts();
  }

  // Writing get request
  retrievePosts(){
    axios.get("/posts").then(res => {
      if(res.data.success){
        this.setState({
          posts: res.data.existingPosts
        });
        console.log(this.state.posts);
      }
    });
  }

  // Delete method
  onDelete = (id) => {
    axios.delete(`/post/delete/${id}`).then((res) => {
        alert("Deleted successfully");
        this.retrievePosts();
    });
  }

  // Filter posts based on search key
  filterData(posts, searchKey) {
    const result = posts.filter((post) =>
      post.topic.toLowerCase().includes(searchKey)||
      post.description.toLowerCase().includes(searchKey)||
      post.postCategory.toLowerCase().includes(searchKey)


    );
    this.setState({ posts: result });
  }

  // Handle search input change
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/posts").then(res => {
        if(res.data.success){
            this.filterData(res.data.existingPosts, searchKey);
        }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <p>All posts</p>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input 
              className='form-control'
              type="search"
              placeholder='Search'
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>
        
        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/post/${post._id}`} style={{textDecoration:'none'}}>
                    {post.topic}
                  </a>
                </td>
                <td>{post.description}</td>
                <td>{post.postCategory}</td>
                <td>
                  <a className="btn btn-warning" href={`/edit/${post._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => this.onDelete(post._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='btn btn-success'>
          <a href="/add" style={{ textDecoration:'none', color:'white' }}>Create new post</a>
        </button>
      </div>
    );
  }
}
