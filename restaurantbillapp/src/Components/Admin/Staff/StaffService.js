import axios from 'axios';

let viewStaff="http://localhost:8080/viewstaff";
let saveStaff="http://localhost:8080/addstaff";
let updateStaff="http://localhost:8080/searchStaffById";
let updStaff="http://localhost:8080/updateStaff";
let deleteStaff="http://localhost:8080/deletestaff";
let searchStaff="http://localhost:8080/searchStaff";


class StaffService
{
    getStaff()
    {
        return axios.get(viewStaff);
    }

    createStaff(staff)
    {
        return axios.post(saveStaff,staff);
    }
    updateStaff(staffid)
    {
        return axios.get(updateStaff+"/"+staffid);
    }
    updStaff(staff)
    {
        return axios.put(updStaff,staff);
    }
    deleteStaff(staffid)
    {
        return axios.delete(deleteStaff+"/"+staffid);
    }
    customizeSearch(pattern)
    {
        return axios.get(searchStaff+"/"+pattern);
    }
}

export default new StaffService();