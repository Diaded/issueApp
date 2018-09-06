import React, {Component} from 'react';

class Issues extends Component{
  constructor(props){
    super(props);
    this.delIssue= this.delIssue.bind(this);
    this.addComment=this.addComment.bind(this);
    this.delComment=this.delComment.bind(this);
  }



  delIssue(e){
    e.preventDefault();
    this.props.delIssue(this.refs[e.target.id].value, e.target.id);
    this.refs[e.target.id].value="";
}

 addComment(e){
   e.preventDefault();
   this.props.addComment(e.target.className, this.refs[e.target.className+"com"].value, this.refs[e.target.className+"del"].value );
   this.refs[e.target.className+"com"].value="";
   this.refs[e.target.className+"del"].value="";
 }

 delComment(e){
   e.preventDefault();
   var arr= e.target.id.split("_");
   this.props.delComment(this.refs[e.target.id].value, arr[0], arr[1]);
   this.refs[e.target.id].value="";
 }





  render(){
      function displayComments(comm, bId, delComment){
        if(comm.length===0){
          return<h5>0 comments submitted</h5>;
        }else{
        var comments= []
        for(var i=0; i<comm.length; i++){
          comments.push(<div className="comment"><p>{comm[i].comment}</p>
              <form onSubmit={delComment} id={bId+"_"+comm[i].id}>
                <input type="text" placeholder="password to delete comment" ref={bId+"_"+comm[i].id} />
                <input type="submit" value="Delete Comment" />
              </form>
              <hr />
            </div>);
        }
        return comments;
      }
}








    if(this.props.array.length===0){
      return(
        <h1>No issues submitted! Go ahead and submit a few on top.</h1>
     );
   }else{
     var issues=[];
     for(var i=0; i<this.props.array.length; i++){
       issues.push(<div className="issue"><h2>{this.props.array[i].issue}</h2>
          <form onSubmit={this.delIssue} id={this.props.array[i]._id}>
            <input type="text" placeholder="password to delete issue" ref={this.props.array[i]._id} />
            <input type="submit" value="delete" />
          </form>
          <hr / >
          <div>
            {displayComments(this.props.array[i].comments, this.props.array[i]._id, this.delComment=this.delComment.bind(this))}
          </div>
          <div>
            <form className={this.props.array[i]._id} onSubmit={this.addComment}>
              <textarea placeholder="Add comment here" ref={this.props.array[i]._id+"com"} />
              <input type="text" placeholder="password to delete comment" ref={this.props.array[i]._id+"del"} />
              <input type="submit" value="Add Comment"  />
            </form>
          </div>
       </div>);
     }
     return(
       <div className="allIssues">
          {issues}

       </div>
     );
   }

  }

}

export default Issues;
