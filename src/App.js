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
    if(value === "Author")
    {
      var list = this.props.totalData;
      var author = list.map(item => 
        {
        var count = list.filter(items => { return items.Author === item.Author; }).length;
        let Author = item.Author;
        let Count = count;
        return { Author, Count };
        });

      var getList = author.reduce((x, y) => (x.findIndex(e => e.Author === y.Author) < 0 ? [...x, y] : x),[] );
      
      this.setState({ Author: getList, status: "Author" });
    }

    else if(value === "Publisher")
    {
      list = this.props.totalData;
      var Publisher = list.map(item => 
        {
        var count = list.filter(items => 
        {
          return items.Publisher === item.Publisher;
        }).length;
        let Publisher = item.Publisher;
        let Count = count;
        return { Publisher, Count };
      });
      getList = Publisher.reduce(
        (x, y) => (x.findIndex(e => e.Publisher === y.Publisher) < 0 ? [...x, y] : x),[] );
      this.setState({ Publisher: getList, status: "Publisher" });
    }
  };

deleteUpdateData = (value,e) =>
{
  var updatedData;
  if(value === "Author")
  {
      updatedData = this.props.totalData.filter((item)=>
      {
      return item.Author !== e.target.value
      });
    
      this.props.saveData(updatedData);
      alert("Author Deleted Successfully");
      this.setState({
        status: "Author",
        Author: this.state.Author.filter((item) => { return item.Author !== e.target.value })  
      });
  }
  
  else if( value === "Publisher")
  {
    updatedData = this.props.totalData.filter((item)=>{
      return item.Publisher !== e.target.value
    });
  
    this.props.saveData(updatedData);
    alert("Publisher Deleted Successfully");
    this.setState({
      status: "Publisher",
      Publisher: this.state.Publisher.filter((item) => { return item.Publisher !== e.target.value })  
    });
  }
  
  else if( value === "Books")
  {
    updatedData = this.props.totalData.filter((item)=>
    {
      return item.BookName !== e.target.value
    });
    
    this.props.saveData(updatedData);
    alert("Book Deleted Successfully");
    this.setState({status: "Books"});
  }

  else if( value === "Update")
  {
    updatedData = this.props.totalData.filter((item)=>
    {
      return item.BookName === e.target.value
    });
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
          this.state.status === "" && (
          <button onClick={this.showBook} className="authorPublisherButton">
            Login
          </button>)
        }

        {
          this.state.status === "Books" && (
          <BookDetail
            showPanel={this.showPanel}
            showBook={this.showBook}
            data={this.props.totalData}
            deleteUpdateData = {this.deleteUpdateData}
          />)
        }

        {
          this.state.status === "Author" && (
          <AuthorList 
            showPanel={this.showPanel} 
            data={this.state.Author} 
            deleteData = {this.deleteUpdateData} 
          />)
        }

        {
          this.state.status === "Publisher" && (
          <PublisherList
          showPanel={this.showPanel}
          data={this.state.Publisher} 
          deleteData = {this.deleteUpdateData} 
          />)
        }

        {
          this.state.status === "AddBooks" && (
          <AddBooks
            showPanel={this.showPanel}
            saveBookDetail={this.saveBookDetail}
            data={this.props.totalData}
          />)
        }

        {
          this.state.status === "UpdateBook" && (
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
