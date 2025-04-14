import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from './CategoryService';

const UpdateCategory = () => {
  const [category, setCategory] = useState({ name: "" });
  const [msg, setMsg] = useState("");
  const { catid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    CategoryService.updateCategory(catid)
      .then((res) => setCategory(res.data))
      .catch((err) => console.error(err));
  }, [catid]);

  const unihandler = (e) => {
    setCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateCategory = (e) => {
    e.preventDefault();
    CategoryService.updCategory(category).then((res) => {
      setMsg("Category updated successfully!");
      setTimeout(() => navigate("/admin/viewcategory"), 1500);
    });
  };

  return (
    <div className="add-category-wrapper">
      <div className="form-container">
        <form onSubmit={updateCategory} className="category-form">
          <h2>Update Category</h2>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Category Name"
              value={category.name}
              onChange={unihandler}
            />
          </div>
          {msg && <p className="message">{msg}</p>}
          <button type="submit" className="submit-btn">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
