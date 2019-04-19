import React, { Component } from "react";
import "./App.css";
import { bindActionCreators } from "redux";
import { saveData, getData } from "./action/index";
import { connect } from "react-redux";
import Headers from "./component/header";
import BookDetail from "./component/bookDetail";
import AuthorList from "./component/authorList";
import PublisherList from "./component/publisherList";
import AddBooks from "./component/addBook";
import UpdateBook from "./component/updateBook";
import * as R from "ramda";



class App extends Component {
  state = 
  {
    status: "",
    Author: [],
    Publisher: [],
    Book : []
  };

  showPanel = value => {
    this.setState({ status: value });
    if(R.equals(value,"Author"))
    {
      var list = this.props.totalData;
      var author = list.map(item => 
        {
        var count = R.filter((items => { return R.equals(items.Author,item.Author); }),list).length;
        let Author = item.Author;
        let Count = count;
        return { Author, Count };
        });

      var getList = author.reduce((x, y) => (x.findIndex(e => R.equals(e.Author,y.Author)) < 0 ? [...x, y] : x),[] );
      
      this.setState({ Author: getList, status: "Author" });
    }

    else if(value === "Publisher")
    {
      list = this.props.totalData;
      var Publisher = R.map((item => 
        {
        var count = R.filter((items => 
        {
          return R.equals(items.Publisher,item.Publisher);
        }),list).length;
        let Publisher = item.Publisher;
        let Count = count;
        return { Publisher, Count };
      }),list);
      getList = Publisher.reduce(
        (x, y) => (x.findIndex(e => R.equals(e.Publisher,y.Publisher)) < 0 ? [...x, y] : x),[] );
      this.setState({ Publisher: getList, status: "Publisher" });
    }
  };

deleteUpdateData = (value,e) =>
{
  var updatedData;
  if(R.equals(value,"Author"))
  {
      updatedData = R.filter(((item)=>
      {
      return !R.equals(item.Author,e.target.value)
      }),this.props.totalData);
    
      this.props.saveData(updatedData);
      alert("Author Deleted Successfully");
      this.setState({
        status: "Author",
        Author: this.state.Author.filter((item) => { return !R.equals(item.Author,e.target.value) })  
      });
  }
  
  else if( R.equals(value,"Publisher"))
  {
    updatedData = R.filter(((item)=>{
      return item.Publisher !== e.target.value
    }),this.props.totalData);
  
    this.props.saveData(updatedData);
    alert("Publisher Deleted Successfully");
    this.setState({
      status: "Publisher",
      Publisher: this.state.Publisher.filter((item) => { return !R.equals(item.Publisher,e.target.value) })  
    });
  }
  
  else if( R.equals(value,"Books"))
  {
    updatedData = R.filter(((item)=>
    {
      return !R.equals(item.BookName,e.target.value)
    }),this.props.totalData);
    
    this.props.saveData(updatedData);
    alert("Book Deleted Successfully");
    this.setState({status: "Books"});
  }

  else if( R.equals(value,"Update"))
  {
    updatedData = R.filter(((item)=>
    {
      return R.equals(item.BookName,e.target.value)
    }),this.props.totalData);
    this.setState({Book: updatedData,status: "UpdateBook"});
  }
}

saveBookDetail = data => {
    this.props.saveData(data);
    alert("Data Saved Successfully");
  };

  showBook = () => {
    this.setState({ status: "Books" });
    this.props.getData();
  };

  render() {
    return (
      <div className="App">

        <Headers />
        {
          R.equals(this.state.status,"") && (
          <button onClick={this.showBook} className="authorPublisherButton">
            Login
          </button>)
        }

        {
         R.equals( this.state.status,"Books") && (
          <BookDetail
            showPanel={this.showPanel}
            showBook={this.showBook}
            data={this.props.totalData}
            deleteUpdateData = {this.deleteUpdateData}
          />)
        }

        {
         R.equals( this.state.status, "Author") && (
          <AuthorList 
            showPanel={this.showPanel} 
            data={this.state.Author} 
            deleteData = {this.deleteUpdateData} 
          />)
        }

        {
          R.equals(this.state.status,"Publisher") && (
          <PublisherList
          showPanel={this.showPanel}
          data={this.state.Publisher} 
          deleteData = {this.deleteUpdateData} 
          />)
        }

        {
          R.equals(this.state.status,"AddBooks") && (
          <AddBooks
            showPanel={this.showPanel}
            saveBookDetail={this.saveBookDetail}
            data={this.props.totalData}
          />)
        }

        {
          R.equals(this.state.status,"UpdateBook") && (
          <UpdateBook showPanel={this.showPanel} 
          data={this.props.totalData}
          saveBookDetail={this.saveBookDetail}
          updateData = {this.state.Book[0]}
          />)
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.reducer;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { saveData: saveData, getData: getData },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
