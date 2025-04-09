import React, {useState} from "react";
import './Category.css';

let AddCategory=()=>
{
    let [categoryName, setCategoryName]=useState("");
    let [message, setMessage]=useState("");

    let handleSubmit=(e)=>
    {
        e.preventDefault();
        if(!categoryName || categoryName.trim().length === 0)
        {
            setMessage("Category Name Cannot Be Empty");
            return;
        }
        setMessage(`Category "${categoryName}" Added Successfully!`);
        setCategoryName(""); //clear input field after submission
        setTimeout(()=> setMessage(""), 3000);
    };

    return (
        <>
          <div className="add-category-wrapper">
  <div className="form-container">
    <form onSubmit={handleSubmit} className="category-form">
      <h2>Add Category</h2>
      <div className="form-group">
        <label>Category Name</label>
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      {message && <p className="message">{message}</p>}
      <button type="submit" className="submit-btn">
        Add Category
      </button>
    </form>
  </div>
</div>

        </>
      );
    };      
export default AddCategory;