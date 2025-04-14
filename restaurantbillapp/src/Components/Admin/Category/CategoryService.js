import axios from 'axios';

let viewCategory="http://localhost:8080/viewCategory";
let saveCategory="http://localhost:8080/addCategory";
let updateCategory="http://localhost:8080/searchCatById";
let updCategory="http://localhost:8080/updateCategory";
let deleteCategory="http://localhost:8080/deleteById";
let searchCategory="http://localhost:8080/search";


class CategoryService
{
    getCategory()
    {
        return axios.get(viewCategory);
    }

    createCategory(category)
    {
        return axios.post(saveCategory,category);
    }
    updateCategory(catid)
    {
        return axios.get(updateCategory+"/"+catid);
    }
    updCategory(category)
    {
        return axios.put(updCategory,category);
    }
    deleteCategory(catid)
    {
        return axios.delete(deleteCategory+"/"+catid);
    }
    customizeSearch(pattern)
    {
        return axios.get(searchCategory+"/"+pattern);
    }
}

export default new CategoryService();