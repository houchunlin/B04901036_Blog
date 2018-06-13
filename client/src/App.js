import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    
    //fetch('/').then(res => this.setState({ articles: res.data }));
    fetch('/').then(res => console.log(res));
    
    console.log(this.state.articles);
  }

  render() {
    return (
      <div className="App">
        <h1>Articles</h1>
        {this.state.articles.map(article =>
          <div key={article.id}>{article.title}</div>
        )}

      </div>
    );
  }
}

export default App;
