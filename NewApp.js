import React from "react";
import Header from "./To do list App/Header";

import { useState, useEffect } from "react";
import MyList from "./To do list App/Content";
import Footer from "./To do list App/Footer";
import AddItem from "./To do list App/Input Items";
import SearchItem from "./To do list App/Search Item";
import apiRequest from "./To do list App/apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) throw Error("Data Not Received");
        const listItems = await response.json();

        setItems(listItems);

        setFetchError(null);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];

    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application / json" },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(listItems);
  };

  const handleDelete = (idToDelete) => {
    const listItems = items.filter((item) => item.id !== idToDelete);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    /* to change the form's default behavior of reload use  as below */
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);

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
