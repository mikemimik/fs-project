import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  ListGroup,
} from 'react-bootstrap';

import './App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}

class ProjectExample extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:postId" component={Post} />
        </div>
      </Router>
    );
  }
}

class Posts extends Component {
  constructor () {
    super();
    this.state = {
      posts: [],
    };
  }

  fetchPosts = async () => {
    try {
      const response = await fetch('/posts');

      if (response.ok) {
        const data = await response.json();

        this.setState({
          posts: data,
        });
      } else {
        console.warn('the response was bad');
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount () {
    this.fetchPosts();
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h2>Posts</h2>
        <ListGroup>
          {
            posts.map((post) => {
              return (
                <ListGroup.Item key={post._id}>
                  <Link to={`/posts/${post._id}`}>{post.excerpt}</Link>
                </ListGroup.Item>
              );
            })
          }
        </ListGroup>
      </div>
    );
  }
}

class Post extends Component {
  constructor () {
    super();
    this.state = {
      post: {},
    };
  }

  fetchPost = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}`);

      if (response.ok) {
        const data = await response.json();
        this.setState({
          post: data,
        });
      } else {
        console.warn('the response was bad');
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount () {
    console.log('this.props:', this.props);
    const { match } = this.props;
    const { postId } = match.params;

    this.fetchPost(postId);
  }

  render() {
    const { post } = this.state;
    return (
      <div>{JSON.stringify(post)}</div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ProjectExample />
    </div>
  );
}

export default App;
