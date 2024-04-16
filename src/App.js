import React from "react";
import Header from "./To do list App/Header";

import { useState, useEffect } from "react";
import MyList from "./To do list App/Content";
import Footer from "./To do list App/Footer";
import AddItem from "./To do list App/Input Items";
import SearchItem from "./To do list App/Search Item";
// CREATE OPERATION -To update data in the server.
import apiRequest from "./To do list App/apiRequest";

function App() {
  const API_URL = "http://localhost:3600/items";
  // Containing An Error
  // const API_URL = "http://localhost:3500/itemsk";

  /* TO DO LIST APP__CONTENT */

  // Default array for the items -ARRAY DESTRUCTRE
  const [items, setItems] = useState([]);

  // Default array for the Add Item
  const [newItem, setNewItem] = useState("");

  // Default array (destrucuring array) for the Search Item
  const [search, setSearch] = useState("");

  // To display the error message
  const [fetchError, setFetchError] = useState(null);

  // To display the loading....
  const [isLoading, setIsLoading] = useState(true);

  // USE EFFECT HOOK -primarily used for handling side effects in functional components.

  // Fetching Data: If your form requires data from an external source (e.g., an API),
  // you can use useEffect to initiate the data fetching process when the component mounts.

  // Form Validation: You can use useEffect to perform form validation when the form or its inputs change.

  // Handling Side Effects on Form Submission:  to perform actions after the form is submitted,
  // such as clearing the form fields or navigating to another page.

  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("todo_list"));
  // });

  // FETCH DATA

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        // console.log(response);
        // To display the error message
        if (!response.ok) throw Error("Data Not Received");
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        // Error
        setFetchError(null);
      } catch (error) {
        console.log(error.message);
      } finally {
        // To display Loading...
        setIsLoading(false);
      }
    };
    // Setting timeout delay to display
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    // Update the state with the new array of items
    setItems(listItems);
    // Store the updated list in local storage
    // localStorage.setItem("todo_list", JSON.stringify(listItems));

    /* CREATE OPERATION -TO POST DATA IN THE SERVER */
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application / json" },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  // Function to handle checkbox state changes
  const handleCheck = async (id) => {
    // Update the checked state of the item with the specified id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    // Update the state with the new array of items
    setItems(updatedItems);

    // Store the updated list in local storage
    // localStorage.setItem("todo_list", JSON.stringify(updatedItems));

    /* UPDATE OPERATION - To modify the existing data */
    const updatedItem = updatedItems.find((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: updatedItem.checked }),
    };

    const reqUrl = `${API_URL}/${id}`;

    try {
      const result = await apiRequest(reqUrl, updateOptions);
      if (result) {
        setFetchError(result);
      }
    } catch (error) {
      console.error("Error making PATCH request:", error);
      setFetchError("Error making PATCH request");
    }
  };

  // Function to handle item deletion
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems));

    /* Delete Operation - Removing an existing item */

    const deleteOptions = {
      method: "DELETE",
      // headers: { "Content-Type": "application/json" },
    };

    const reqUrl = `${API_URL}/${id}`;

    try {
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) {
        setFetchError(result);
      }
    } catch (error) {
      console.error("Error making PATCH request:", error);
      setFetchError("Error making PATCH request");
    }
  };

  const handleSubmit = (e) => {
    /* to change the form's default behavior of reload use  as below */
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    // add item
    setNewItem("");
  };

  // RENDERING

  return (
    <div className="App">
      <Header Title="To Do list " />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItem search={search} setSearch={setSearch} />

      <main>
        {/* Loading items... */}
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <MyList
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            // setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
