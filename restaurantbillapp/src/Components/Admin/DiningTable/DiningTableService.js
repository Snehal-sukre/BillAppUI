import axios from 'axios';

let viewTables="http://localhost:8080/viewtables";
let saveTable="http://localhost:8080/addtable";
let updateTable="http://localhost:8080/searchTableById";
let updTable="http://localhost:8080/updateTable";
let deleteTable="http://localhost:8080/deleteTableById";
let searchTable="http://localhost:8080/searchTable";


class DiningTableService
{
    getTables()
    {
        return axios.get(viewTables);
    }

    createTable(table)
    {
        return axios.post(saveTable,table);
    }
    updateTable(tableid)
    {
        return axios.get(updateTable+"/"+tableid);
    }
    updTable(table)
    {
        return axios.put(updTable,table);
    }
    deleteTable(tableid)
    {
        return axios.delete(deleteTable+"/"+tableid);
    }
    customizeSearch(pattern)
    {
        return axios.get(searchTable+"/"+pattern);
    }
}

export default new DiningTableService();