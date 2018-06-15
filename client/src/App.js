import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToggleDisplay from 'react-toggle-display';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      article: {
        id: "",
        title: "",
        author: "",
        content: ""
      },
      mode: 0,//0:initial 1:view 2:new 3:edit
      newTitle: "",
      newContent: "",
      user: "",
      login: false
    };
  }

  fetchArticle = (e) => {
    var url = "/articles/" + e.currentTarget.id;
    fetch(url)
    .then( res => res.json() )
    .then( data => {
      var tmp_article = {id: data._id, title: data.title, author: data.author, content:data.content}; 
      this.setState({ article: tmp_article, mode: 1 })
    });
  }

  fetchArticles = () => {
    fetch('/articles')
    .then( res => res.json() )
    .then( data => { this.setState({ articles: data, mode: 0 })} );
  }

  newPost = () => {
    fetch("/articles",{
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({title: this.state.newTitle, author: this.state.user, content: this.state.newContent}),
      method: 'POST'
    })
    .then( () => {
      this.fetchArticles();
      this.setState({newTitle: "", newContent: ""});
    });  
  }

  cancelPost = () => {
    this.setState({newTitle: "", newContent: "", mode: 0});
  }

  editPost = (e) => {
    var url = "/articles/" + e.currentTarget.id;

    fetch(url,{
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({title: this.state.article.title, author: this.state.user, content: this.state.article.content}),
      method: 'PUT'
    })
    .then( () => {
      this.fetchArticles();
    });
  }

  deletePost = (e) => {
    var url = "/articles/" + e.currentTarget.id;
    fetch(url,{
      method: 'DELETE'
    })
    .then( () => {
      this.fetchArticles();
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  logout = () => {
    this.setState({login: false, user: ""})
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 style={{float: "left"}}>Blog</h1>
          <ToggleDisplay show={this.state.login} tag="section">
            <h3>Username: {this.state.user}</h3>
            <h3 style={{backgroundColor: "aqua", border: "solid black 2px"}} onClick={this.logout}>Logout</h3>
            <h2 style={{backgroundColor: "gold", float: "right", position: "absolute", right: "100px"}} onClick={ () => this.setState({mode: 2})}>Create new article</h2>
          </ToggleDisplay>
          <ToggleDisplay show={!this.state.login} tag="section">
            <input type="text" id="log" value={this.state.user} placeholder="Enter Username..." onChange={(e) => this.setState({user: e.target.value }) }/>
            <button id="log" onClick={() => this.setState({login: true})}>Login</button>
          </ToggleDisplay>
        </div>

        <div style={{clear: "both"}}></div>

        <div className="column1">
          <h2>Article List</h2>
          {this.state.articles.map(article => 
                    <div key={article._id} className="block" id={article._id} onClick={this.fetchArticle}>
                      <h2>{article.title}</h2>
                      <hr />
                      <p>By {article.author}</p>
                    </div>
          )}
        </div>

        <div className="vl" />

        
        <div className="column2">

          <ToggleDisplay show={this.state.mode==1} tag="section">
            <h1>{this.state.article.title}</h1>
            <ToggleDisplay show={this.state.article.author==this.state.user && this.state.login} tag="section">
              <p><button onClick={ () => this.setState({mode: 3})}>Edit</button> <button id={this.state.article.id} onClick={this.deletePost}>Delete</button></p>
            </ToggleDisplay>
            <hr />
            <p><pre>{this.state.article.content}</pre></p>
          </ToggleDisplay>

          <ToggleDisplay show={this.state.mode==2} tag="section">
            <input type="text" className="Titlein" value={this.state.newTitle} placeholder="Title..." onChange={(e) => this.setState({newTitle: e.target.value})}/>
            <p><button onClick={this.newPost}>Post</button> <button onClick={this.cancelPost}>Cancel</button></p>
            <hr />
            <textarea value={this.state.newContent} onChange={(e) => this.setState({newContent: e.target.value})}/>
          </ToggleDisplay>

          <ToggleDisplay show={this.state.mode==3} tag="section">
            <input type="text" className="Titlein" value={this.state.article.title} placeholder="Title..." onChange={(e) => {var tmp_article = this.state.article; tmp_article.title = e.target.value; this.setState({article: tmp_article }) }}/>
            <p><button id={this.state.article.id} onClick={this.editPost}>Save</button> <button onClick={this.cancelPost}>Cancel</button></p>
            <hr />
            <textarea value={this.state.article.content} onChange={(e) => {var tmp_article = this.state.article; tmp_article.content = e.target.value; this.setState({article: tmp_article }) }}/>
          </ToggleDisplay>
        </div>

        

      </div>
    );
  }
}


export default App;
