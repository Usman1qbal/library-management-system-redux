import React, { Component } from "react";
import "./style/style.css";
class addBook extends Component  {

  validateData = (BookName, Author, Publisher, Date) => {
    if (BookName !== "" && Author !== "" && Publisher !== "" && Date !== "") {
      if (!Date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        alert("Date Format Issue");
        return false;
      } else {
        const { Book, author, publisher, date } = this.refs;
        Book.value = author.value = publisher.value = date.value = "";
        return true;
      }
    } else {
      alert("All Field are required");
      return false;
    }
  };

  saveBook = () => {
    const { Book, author, publisher, date } = this.refs;

    const BookName = Book.value.toUpperCase();
    const Author = author.value.toUpperCase();
    const Publisher = publisher.value.toUpperCase();
    const Date = date.value;

    if (this.validateData(BookName, Author, Publisher, Date) === true) {
      const list = this.props.data.filter(item => {
        return (
          item.BookName === BookName &&
          item.Author === Author &&
          item.Publisher === Publisher
        );
      });
      if (list.length !== 0) {
        alert("Book Detail Already Saved in Database");
      } else {
        this.props.data.push({
          BookName: BookName,
          Author: Author,
          Publisher: Publisher,
          Date: Date
        });
        this.props.saveBookDetail(this.props.data);
      }
    }
  };

  render() {
    return (
      <section id="addBook" className="addTextboxFormat">
        <h1 className="Header addBookHeading"> Add Book Detail</h1>
        <label>Book Name</label>
        <input
          type="text"
          ref="Book"
          name="Book Name"
          placeholder="Book name.."
        />

        <label>Author</label>
        <input
          type="text"
          ref="author"
          name="Author"
          placeholder="Author name.."
        />

        <label>Publisher</label>
        <input
          type="text"
          ref="publisher"
          name="Publisher"
          placeholder="Publisher name.."
        />

        <label>Date</label>
        <input
          type="text"
          ref="date"
          name="Date"
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

export default addBook;
