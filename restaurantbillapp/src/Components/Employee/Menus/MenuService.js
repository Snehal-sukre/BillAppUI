import axios from "axios";

let viewMenu="http://localhost:8080/viewmenus";
let viewCategory="http://localhost:8080/viewCategory";
let searchMenu="http://localhost:8080/searchMenu";

class MenuService
{
    getMenus()
    {
        return axios.get(viewMenu);
    }

    getCategories()
    {
        return axios.get(viewCategory);
    }
    
    customizeSearch(pattern)
    {
        return axios.get(searchMenu+"/"+pattern);
    } 
}
export default new MenuService();