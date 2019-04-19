import React, { Component } from 'react';
import './style/style.css';

class updateBook extends Component {
  
state =
{
  bookName:  this.props.updateData.BookName,
  author:    this.props.updateData.Author,
  publisher: this.props.updateData.Publisher,
  date:      this.props.updateData.Date
}

validateData = (BookName, Author, Publisher, Date) => 
{
  if (BookName !== "" && Author !== "" && Publisher !== "" && Date !== "") 
  {
    if (!Date.match(/^\d{4}-\d{2}-\d{2}$/)) 
    {
      alert("Date Format Issue");
      return false;
    } 
    else 
    {
      const { Book, author, publisher, date } = this.refs;
      Book.value = author.value = publisher.value = date.value = "";
      return true;
    }
  } 
  else 
  {
    alert("All Field are required");
    return false;
  }
};

saveBook = () => 
{
  const { Book, author, publisher, date } = this.refs;

  const BookName = Book.value.toUpperCase();
  const Author = author.value.toUpperCase();
  const Publisher = publisher.value.toUpperCase();
  const Date = date.value;

  if (this.validateData(BookName, Author, Publisher, Date) === true) 
  {
    const list = this.props.data.filter(item => 
      {
        return (
          item.BookName === BookName &&
          item.Author === Author &&
          item.Publisher === Publisher
        );
      });

    if (list.length !== 0) 
    {
      alert("Book Detail Already Saved in Database");
    } 
    else 
    {
      var updatedBookDetail = this.props.data.map((item)=>
      {
        if(item.BookName === this.props.updateData.BookName && item.Author === this.props.updateData.Author && item.Publisher === this.props.updateData.Publisher)
          {
            item.BookName= BookName;
            item.Author= Author;
            item.Publisher= Publisher;
            item.Date= Date;
            return item;
          }
          else
          {
            return item;
          }
      });
      this.props.saveBookDetail(updatedBookDetail);
    }
  }
};


changeText=(e)=>
{
switch (e.target.name)
{
  case "Book Name":
    this.setState({ bookName: e.target.value });
    break;
    
  case "Author":
      this.setState({ author: e.target.value });
      break;
  
  case "Publisher":
    this.setState({ publisher: e.target.value });
    break;
  
  case "Date":
      this.setState({ date: e.target.value });
      break;
}
}
render() { 

  return (
    <section id="addBook" className="addTextboxFormat">
    <h1 className="Header addBookHeading"> Update Book Detail</h1>
    
    <label>Book Name</label>
    <input
      type="text"
      ref="Book"
      name="Book Name"
      value= {this.state.bookName}
      onChange = {this.changeText}
      placeholder="Book name.."
    />

    <label>Author</label>
    <input
      type="text"
      ref="author"
      name="Author"
      value={this.state.author}
      onChange = {this.changeText}
      placeholder="Author name.."
    />

    <label>Publisher</label>
    <input
      type="text"
      ref="publisher"
      name="Publisher"
      value={this.state.publisher}
      onChange = {this.changeText}
      placeholder="Publisher name.."
    />

    <label>Date</label>
    <input
      type="text"
      ref="date"
      name="Date"
      value={this.state.date}
      onChange = {this.changeText}
      placeholder="YYYY - MM - DD"
    />

    <input
      type="submit"
      value="Save"
      className="authorPublisherButton"
      onClick={this.saveBook}
    />
    <input
      type="submit"
      value="Back / Cancel"
      onClick={this.props.showPanel.bind(this, "Books")}
      className="authorPublisherButton"
    />
  </section>
  );
}
}
 
export default updateBook;