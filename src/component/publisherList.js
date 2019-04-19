import React from 'react';
import './style/style.css';

const publisherList=(props) => {
  
let content = ( 
  <div>
    <table id="Publisher-table">
      <thead>
        <tr className="table-heading">
          <th>Publisher</th>
          <th>Number Of Books</th>
          <th>Actions</th>
      </tr>
      </thead>
    <tbody>
    {props.data.map((item, key) => {
    return (
      <tr className="tableHeading" key = {item+key}>
        <td>{item.Publisher}</td>
        <td>{item.Count}</td>
        <td>
          <button value={item.Publisher} onClick={props.deleteData.bind(this,"Publisher")}  className="actionsColumn">
            Delete
          </button>
        </td>
      </tr>
      );
    })}
    </tbody>
    </table>

    <input type="button" className="addBookBtn" onClick={props.showPanel.bind(this,"Books")} value="Go Back"/>
  </div>
  );
  return content;
}

export default publisherList;