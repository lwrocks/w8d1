import React, { Component } from "react";
import axios from "axios";

export default class PostDetail extends Component {
  state = {
    //
  };

  componentDidMount() {
    const id = this.props.match.params.postId;

    axios.get(`/api/posts/${id}`).then(response => {
      console.log(response);
      this.setState({
        post: response.data
      });
    });
  }

  render() {
    if (!this.state.post) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.content}</p>
        <p>posted on {new Date(this.state.post.create_at).toDateString()}</p>
        <p>Upvoted {this.state.post.upvote_count} times</p>
      </div>
    );
  }
}
