import axios from 'axios';

let viewCategory="http://localhost:8080/viewCategory";
let saveCategory="http://localhost:8080/addCategory";

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
}

export default new CategoryService();