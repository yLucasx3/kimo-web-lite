import { post } from 'config/axios';
import endpoints from 'config/endpoints';

const orders = {
    store: async data => {
        return await post(endpoints.ORDERS, data);
    },
};

export default orders;
