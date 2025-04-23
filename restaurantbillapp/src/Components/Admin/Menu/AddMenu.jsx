import React, { useState, useEffect } from "react";
import "./Menu.css";
import MenuService from "./MenuService";
import CategoryService from "../Category/CategoryService";

let AddMenu = () => {
  const [menu, setMenu] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ Fetch categories from backend
    CategoryService.getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setMenu({ ...menu, image: files[0] }); // Use first file
    } else {
      setMenu({ ...menu, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, categoryId, price, description, image } = menu;

    if (!name || !categoryId || !price || !description || !image) {
      setMessage("All fields are required!");
      return;
    }
    console.log("Sending Menu To Backend");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image); // Append the image file

    // Send the FormData to the backend
    MenuService.createMenu(formData)
      .then((res) => {
        console.log("Response From Backend:" + res.data);
        setMessage(res.data);
        setMenu({
          name: "",
          categoryId: "",
          price: "",
          description: "",
          image: null,
        });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response?.data || "Something went wrong");
      });
};

  return (
    <div className="menu-container">
    <div className="form-wrapper">
      <div className="container">
        <h2>Add Menu</h2>
        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-group">
            <label>Menu Name</label>
            <input
              type="text"
              value={menu.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Menu Name"
              required />
          </div>

          <div className="form-group">
            <label>Select Category</label>
            <select
              value={menu.categoryId}
              name="categoryId"
              onChange={handleChange}
              required >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price" 
              value={menu.price}
              onChange={handleChange}
              placeholder="Enter Price"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={menu.description}
              name="description"
              onChange={handleChange}
              placeholder="Enter Description"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Menu Image</label>
            <input
              type="file"
              name="image"  
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {message && <p className="message">{message}</p>}

          <button type="submit" className="submit-btn">
            Add Menu
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddMenu;
