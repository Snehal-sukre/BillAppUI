import React, {useState} from "react";
import './Category.css';
import CategoryService from "./CategoryService";

let AddCategory=()=>
{
    let [category, setCategory]=useState(
        {
            name:""
        });
    let [msg, setMsg]=useState("");

    const handleChange=(e)=>
    {
        setCategory({...category,[e.target.name]: e.target.value});
    }

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(!category.name || category.name.trim().length===0)
        {
            setMsg("Category Name Cannot Be Empty");
            return;
        }
        console.log("sending category to backend");

        CategoryService.createCategory(category)
        .then((res)=>
        {
            console.log("Response from backend: "+res.data);
            setMsg(res.data);
            setCategory({name:""});
            setTimeout(()=>setMsg(""),3000);
        })
        .catch((err)=>
        {
            setMsg(err.response?.data || "Something Went Wrong");
        });
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
          name="name"
          placeholder="Enter Category Name"
          value={category.name}
          onChange={handleChange}
        />
      </div>
      {msg && <p className="message">{msg}</p>}
      <button type="submit" className="submit-btn">Add Category</button>
    </form>
  </div>
</div>
        </>
      );
    };      
export default AddCategory;