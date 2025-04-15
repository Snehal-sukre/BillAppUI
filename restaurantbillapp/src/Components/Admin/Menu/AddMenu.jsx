import React, { useState, useEffect } from "react";
import "./Menu.css"; 

let AddMenu = () => {
  const [menu, setMenu] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
    message: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: "Breakfast" },
      { id: 2, name: "Snacks" },
      { id: 3, name: "Desserts" },
      { id: 4, name: "Drinks" },
      { id: 5, name: "Lunch" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, categoryId, price, description, image } = menu;

    if (!name || !categoryId || !price || !description || !image) {
      setMenu((prev) => ({ ...prev, message: "All Fields Are Required!" }));
      return;
    }

    console.log("Menu Data: ", menu);
    setMenu({
      name: "",
      categoryId: "",
      price: "",
      description: "",
      image: null,
      message: `Menu ${menu.name} added successfully!`,
    });

    setTimeout(() => {
      setMenu((prev) => ({ ...prev, message: "" }));
    }, 3000);
  };

  return (
    <div className="form-wrapper">
    <div className="container">
      <h2>Add Menu</h2>
      <form onSubmit={handleSubmit} className="menu-form">
        <div className="form-group">
          <label>Menu Name</label>
          <input type="text" value={menu.name} onChange={(e) => setMenu({ ...menu, name: e.target.value })}
            placeholder="Enter Menu Name" required />
        </div>

        <div className="form-group">
          <label>Select Category</label>
          <select
            value={menu.categoryId}
            onChange={(e) => setMenu({ ...menu, categoryId: e.target.value })}
            required>
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" value={menu.price} onChange={(e) => setMenu({ ...menu, price: e.target.value })}
            placeholder="Enter Price" required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={menu.description} onChange={(e) => setMenu({ ...menu, description: e.target.value })}
            placeholder="Enter Description" required />
        </div>

        <div className="form-group">
          <label>Upload Menu Image</label>
          <input type="file" accept="image/*" onChange={(e) => setMenu({ ...menu, image: e.target.files[0] })} required  />
        </div>

        {menu.message && <p className="message">{menu.message}</p>}

        <button type="submit" className="submit-btn">Add Menu</button>
      </form>
    </div>
    </div>
  );
};

export default AddMenu;