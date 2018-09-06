import React, { Component } from 'react';
import Form from './mainForm.js';
import Issues from './issues.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      array: []
    }
    this.addIssue=this.addIssue.bind(this);
    this.delIssue=this.delIssue.bind(this);
    this.addComment=this.addComment.bind(this);
    this.delComment=this.delComment.bind(this);
  }


componentWillMount(){
 fetch('/api')
          .then(res=> res.json())
          .then(data=> this.setState({array: data.array}));
      }

addIssue(issue, password){
  fetch('/addIssue',{
    method:'post',
    body: JSON.stringify({issue: issue, password: password}),
    headers:{
        "Content-Type": "application/json"
      }
  }).then(res=> res.json())
    .then(data=> this.setState({array: data.array}));
}

delIssue(password, id){
  fetch('/delIssue',{
    method: 'delete',
    body:JSON.stringify({password: password, id:id}),
    headers:{
        "Content-Type": "application/json"
      }
  }).then(res=> res.json())
    .then(data=>(data.array!=="not working")?this.setState({array: data.array}):alert('wrong password'));
}

addComment(id, comment, password ){
  fetch('/addComment',{
    method: 'post',
    body: JSON.stringify({id:id, comment: comment, password:password}),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=> res.json())
    .then(data=> this.setState({array: data.array}));
}

delComment(password, id, comId){
  fetch('/delComment',{
    method:'delete',
    body: JSON.stringify({password: password, id: id, comId:comId}),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=>res.json())
    .then(data=>(data.array!=="not working")?this.setState({array: data.array}):alert('wrong password'));
}

  render(){
    return (
      <div className="App">
        <Form addIssue={this.addIssue=this.addIssue.bind(this)} />
        <Issues array={this.state.array} delIssue={this.delIssue=this.delIssue.bind(this)}
        addComment={this.addComment=this.addComment.bind(this)} delComment={this.delComment=this.delComment.bind(this)}/>
      </div>
    );
  }
}

export default App;
