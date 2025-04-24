import axios from "axios";

let viewMenu="http://localhost:8080/viewmenus";
let viewCategory="http://localhost:8080/viewCategory";

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
}
export default new MenuService();