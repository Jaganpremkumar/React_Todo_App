import React from "react";
import { FaPlus } from "react-icons/fa";

import { useRef } from "react";
// Uses of useRef - Accessing Input Values, Focusing on Inputs, Clearing Input Values.

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  // inputRef is used to capture the reference to the input element.
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      {/* to get the input we need to add label 1st */}
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        {/* Below is a component */}
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
