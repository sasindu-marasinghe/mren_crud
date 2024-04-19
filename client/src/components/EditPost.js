import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {

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

    // Handle form submission
    onSubmit = (e) => {
        e.preventDefault();
        const { match } = this.props;
        if (!match || !match.params || !match.params.id) {
            console.error("Post ID not found in URL");
            return;
        }
        const id = match.params.id;

        const { topic, description, postCategory } = this.state;

        const data = {
            topic: topic,
            description: description,
            postCategory: postCategory
        }

        axios.put(`/post/update/${id}`, data)
            .then((res) => {
                if (res.data.success) {
                    alert("Post updated successfully");
                    this.setState({
                        topic: '',
                        description: '',
                        postCategory: ''
                    });
                } else {
                    console.error("Error updating post:", res.data.message);
                }
            })
            .catch(error => {
                console.error("Error updating post:", error);
            });
    }
    // Inside componentDidMount()
    componentDidMount() {
        const { match } = this.props;
        console.log(match); // Log the match prop to see its contents
    
        const id = match?.params?.id;
        if (!id) {
            console.error("Post ID not found in URL");
            return;
        }
    
        axios.get(`/post/${id}`)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        topic: res.data.post.topic,
                        description: res.data.post.description,
                        postCategory: res.data.post.postCategory
                    });
                } else {
                    console.error("Error fetching post:", res.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching post:", error);
            });
    }
    
    
    render() {
        return (
            <div>
                <h2>Edit Post</h2>
                <form onSubmit={this.onSubmit}>
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
                    <button className='btn btn-success' type="submit" style={{ marginTop: '15px' }}>
                        <i className='far fa-check-square'></i>
                        &nbsp;Update
                    </button>
                </form>
            </div>
        );
    }
}
