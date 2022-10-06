import { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  // submit function
  function handleSubmit(e) {
    e.preventDefault();
    if (itemId) {
      const toBeEdited = items.find((todo) => todo.id === itemId);
      const newArray = items.map((t) =>
        t.id === toBeEdited.id
          ? (t = { id: t.id, data: item })
          : (t = { id: t.id, data: t.data })
      );
      setItems([...newArray]);
      setItemId("");
      setItem("");
      return; // this will prevent not to create new list item
    }
    if (item != "") {
      setItems([{ id: `${Date.now()}`, data: item }, ...items]);
      setItem("");
    }
  }
  // delete btn function
  function handleDelete(todoId) {
    const deletedItems = items.filter((t) => t.id !== todoId);
    setItems([...deletedItems]);
  }
  // edit btn function
  function handleEdit(todoId) {
    const itemClicked = items.find((todo) => todo.id === todoId);
    setItem(itemClicked.data);
    setItemId(itemClicked.id);
  }
  return (
    <div className="App">
      <h3 className="title">Todo List</h3>
      <br />
      <div className="container">
        {/* form tag */}
        <form onSubmit={handleSubmit} className="todoform">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button>{itemId != "" ? "Edit" : "Add"}</button>
        </form>
        {/* list componnent */}
        <ul className="ul_tag">
          {items.map((i) => {
            return (
              // <h1>{i.data}</h1>
              <li className="li_tag" key={i.id}>
                <span className="li_text">{i.data}</span>
                <button onClick={() => handleEdit(i.id)}>Edit</button>
                <button onClick={() => handleDelete(i.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
