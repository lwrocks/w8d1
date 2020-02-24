import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsList = props => {
  return props.posts.map(post => {
    return (
      <p key={post._id}>
        [{post.type}]
        <b>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </b>
        <span role="img">⬆️ {post.upvote_count}</span>
      </p>
    );
  });
};

class PostForm extends React.Component {
  state = {
    title: "",
    content: "",
    type: "text"
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios.post("/api/posts", {
      title: this.state.title,
      type: this.state.type,
      content: this.state.content
    });
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label htmlFor="type">Type</label>
        <select
          value={this.state.type}
          name="type"
          onChange={this.handleChange}
        >
          <option value="link">Link</option>
          <option value="text">Text</option>
        </select>
        <button>New Post</button>
      </form>
    );
  }
}

export default class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get("/api/posts").then(response => {
      this.setState({
        posts: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <PostForm />
        <PostsList posts={this.state.posts} />
      </div>
    );
  }
}
