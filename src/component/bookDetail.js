import React from "react";
import "./style/style.css";

const bookDetail =(props) => {
 
var i = 1;
let content =  (
  <div>
    <div className="upperButton">
      <input
        type="button"
        value="Authors"
        onClick={props.showPanel.bind(this, "Author")}
        className="authorPublisherButton"
      />
      <input
        type="button"
        value="Publishers"
        onClick={props.showPanel.bind(this, "Publisher")}
        className="authorPublisherButton"
      />
    </div>

    <table id="bookTable">
      <thead>
        <tr className="tableHeading">
          <th>Number</th>
          <th>BookName</th>
          <th>Author</th>
          <th>Publishers</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, key) => {
          return (
            <tr className="tableHeading" key = {item+key}>
              <td> {i++} </td>
              <td>{item.BookName}</td>
              <td>{item.Author}</td>
              <td>{item.Publisher}</td>
              <td>{item.Date}</td>
              <td>
                <button value={item.BookName} className="actionsColumn" onClick={props.deleteUpdateData.bind(this,"Books")}>
                  Delete
                </button>
                <button value={item.BookName} className="actionsColumn" onClick={props.deleteUpdateData.bind(this,"Update")}>Update</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <input
      type="button"
      className="addBookBtn"
      onClick={props.showPanel.bind(this, "AddBooks")}
      value="Add New"
    />
  </div>
);
return content;
}



export default (bookDetail);
