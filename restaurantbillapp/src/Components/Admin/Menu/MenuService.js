import axios from 'axios';

let viewMenu="http://localhost:8080/viewmenus";
let saveMenu="http://localhost:8080/addmenu";
let updateMenu="http://localhost:8080/searchMenuById";
let updMenu="http://localhost:8080/updateMenu";
let deleteMenu="http://localhost:8080/deleteMenuById";
/*let searchMenu="http://localhost:8080/search"; */


class MenuService
{
    getMenus()
    {
        return axios.get(viewMenu);
    }

    createMenu(menu)
    {
        return axios.post(saveMenu,menu);
    }
    updateMenu(menuid)
    {
        return axios.get(updateMenu+"/"+menuid);
    }
    updMenu(menu)
    {
        return axios.put(updMenu,menu);
    }
    deleteMenu(menuid)
    {
        return axios.delete(deleteMenu+"/"+menuid);
    }
    /*customizeSearch(pattern)
    {
        return axios.get(searchCategory+"/"+pattern);
    } */
}

export default new MenuService();