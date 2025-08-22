import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shopping-items");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Vegetables");
  const [urgent, setUrgent] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("shopping-items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!input.trim()) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: input,
        quantity,
        category,
        urgent,
        purchased: false,
        favorite: false,
      },
    ]);
    setInput("");
    setQuantity(1);
    setUrgent(false);
  };

  const togglePurchased = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const toggleFavorite = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearAll = () => setItems([]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🛒 Smart Shopping List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Item */}
      <div className="add-section">
        <input
          type="text"
          placeholder="Enter item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Snacks</option>
          <option>Beverages</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          Urgent
        </label>
        <button onClick={addItem}>Add</button>
      </div>

      {/* Item List */}
      <ul className="list">
        {filteredItems.map((item) => (
          <li key={item.id} className={item.purchased ? "done" : ""}>
            <strong>{item.name}</strong> ({item.quantity}) [{item.category}]{" "}
            {item.urgent && <span className="urgent">🔥 Urgent</span>}
            {item.favorite && <span className="fav">⭐</span>}
            <div className="actions">
              <button onClick={() => togglePurchased(item.id)}>
                {item.purchased ? "Undo" : "Purchased"}
              </button>
              <button onClick={() => toggleFavorite(item.id)}>⭐ Fav</button>
              <button onClick={() => deleteItem(item.id)}>❌ Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="summary">
        <p>Total: {items.length}</p>
        <p>Purchased: {items.filter((i) => i.purchased).length}</p>
        <p>Pending: {items.filter((i) => !i.purchased).length}</p>
        <p>Favorites: {items.filter((i) => i.favorite).length}</p>
      </div>

      <button onClick={clearAll} className="clear">
        Clear All
      </button>
    </div>
  );
}

export default App;
