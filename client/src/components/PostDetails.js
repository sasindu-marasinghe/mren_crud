import React, { Component } from 'react';
import axios from 'axios';

export default class PostDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            error: null
        };
    }

    componentDidMount() {
        const { match } = this.props;
        if (match && match.params.id) {
            const id = match.params.id;
            axios.get(`/post/${id}`)
                .then((res) => {
                    if (res.data.success) {
                        this.setState({
                            post: res.data.post,
                            error: null
                        });
                        console.log(this.state.post);
                    } else {
                        this.setState({
                            error: res.data.message
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching post:", error);
                    this.setState({
                        error: "An error occurred while fetching the post."
                    });
                });
        }
    }

    render() {
        const { post, error } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div style={{ marginTop: '20px' }}>
                <h4>{post.topic}</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{post.description}</dd>

                    <dt className="col-sm-3">Post Category</dt>
                    <dd className="col-sm-9">{post.postCategory}</dd>
                </dl>
            </div>
        );
    }
}
