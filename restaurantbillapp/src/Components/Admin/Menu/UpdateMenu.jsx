import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "./MenuService";
import CategoryService from "../Category/CategoryService";

let UpdateMenu = () => {
  const [menu, setMenu] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const { menuid } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories
    CategoryService.getCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    // Load existing menu data for editing
    MenuService.updateMenu(menuid)
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, [menuid]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setMenu({ ...menu, image: files[0] });
    } else {
      setMenu({ ...menu, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, categoryId, price, description } = menu;

    if (!name || !categoryId || !price || !description) {
      setMessage("All fields are required!");
      return;
    }

    // Create a form data object (if you want to send image in future)
    const formData = new FormData();
    formData.append("id", menuid); // Add id explicitly
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("price", price);
    formData.append("description", description);

    // If image is included (optional)
    if (menu.image) {
      formData.append("image", menu.image);
    }

    MenuService.updMenu(menu)
      .then((res) => {
        setMessage("Menu updated successfully!");
        setTimeout(() => navigate("/admin/viewmenu"), 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response?.data || "Something went wrong while updating");
      });
  };

  return (
    <div className="form-wrapper">
      <div className="container">
        <h2>Update Menu</h2>
        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-group">
            <label>Menu Name</label>
            <input
              type="text"
              value={menu.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Menu Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Category</label>
            <select
              value={menu.categoryId}
              name="categoryId"
              onChange={handleChange}
              required
            >
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
            />
          </div>

          {message && <p className="message">{message}</p>}

          <button type="submit" className="submit-btn">
            Update Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
