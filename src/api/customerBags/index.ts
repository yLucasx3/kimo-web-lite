import { del, get, post, put } from 'config/axios';
import endpoints from 'config/endpoints';

const customerBags = {
    listByEmail: async (email, context = null) => {
        return await get(endpoints.CUSTOMER_BAGS_EMAIL, [email], undefined, context);
    },
    store: async data => {
        return await post(endpoints.CUSTOMER_BAGS, data);
    },
    update: async (id, data) => {
        return await put(endpoints.CUSTOMER_BAGS_ID, data, [id]);
    },
    destroy: async id => {
        return await del(endpoints.CUSTOMER_BAGS_ID, [id]);
    },
};

export default customerBags;
