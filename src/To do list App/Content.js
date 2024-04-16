import React from "react";
import { FaTrashAlt } from "react-icons/fa";

// import "./Todo Style.css";

// Below is objects as props
const MyList = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {" "}
      {/* Fragment */}
      {/* <h1>To Do List</h1> */}
      {/* To display A text as your list is empty when no list are there using below jsx exp with ternary op */}
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />

              {/* To select the check box when double click on the text */}
              <label
                onDoubleClick={() => handleCheck(item.id)}
                style={item.checked ? { textDecoration: "line-through" } : {}}
              >
                {item.item}
              </label>

              {/*We can use "Null" also, instead of {} */}
              <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "5rem" }}>Your List is Empty</p>
      )}
    </>
  );
};

export default MyList;
