import axios from "axios";

let viewMenu="http://localhost:8080/viewmenus";

class MenuService
{
    getMenus()
    {
        return axios.get(viewMenu);
    }
}
export default new MenuService();