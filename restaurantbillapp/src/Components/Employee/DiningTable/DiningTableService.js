import axios from "axios";

let viewTables="http://localhost:8080/viewtables";

class DiningTableService
{
    getTables()
    {
        return axios.get(viewTables);
    }
}
export default new DiningTableService();