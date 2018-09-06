import React, {Component} from 'react';

class Form extends Component{
  constructor(props){
    super(props);
    this.state={
      input: "",
      password:""
    }

    this.onChangeInput= this.onChangeInput.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  onChangeInput(e){
  this.setState({
    input: e.target.value
  });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
  }

 handleSubmit(e){
   e.preventDefault();
   this.props.addIssue(this.state.input, this.state.password);
   this.setState({
    input:"",
    password:""
   });
 }



  render(){
    return(
      <div className="form">
        <h1>Add an issue/thread</h1>
        <form onSubmit={this.handleSubmit}>
          <h5>Add issue here: </h5>
          <textarea value={this.state.input} placeholder="thread text..." onChange={this.onChangeInput} minlength="1" /><br />
          <h5>Password to delete: </h5>
          <input type="text" value={this.state.password} className="input" placeholder="password to delete" onChange={this.onChangePassword} minlength="1"/><br />
          <input type="submit" value="Submit Thread"  />
        </form>
      </div>
    );
  }
}

export default Form;
