import axios from "axios";

let saveOrder="http://localhost:8080/placeOrder";

class OrderService
{
    createOrder(order)
    {
        return axios.post(saveOrder,order);
    }
}
export default new OrderService();