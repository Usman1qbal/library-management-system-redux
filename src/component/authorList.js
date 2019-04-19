import React from 'react';
import './style/style.css';

const authorList = (props) => {

let content= ( 
    <div>

      <table id="Author-table">
            <thead>
              <tr className="table-heading">
                  <th>Author</th>
                  <th>Number Of Books</th>
                  <th>Actions</th>
              </tr>
            </thead>

            <tbody>
            {props.data.map((item, key) => {
            return (
              <tr className="tableHeading" key = {item+key}>
                <td>{item.Author}</td>
                <td>{item.Count}</td>
                <td>
                  <button value={item.Author} onClick={props.deleteData.bind(this,"Author")}  className="actionsColumn">
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

 
export default authorList;
