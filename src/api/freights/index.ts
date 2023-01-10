import { post } from 'config/axios';
import endpoints from 'config/endpoints';

const freigths = {
    store: async (data, context) => {
        return await post(endpoints.FREIGHTS, data, undefined, context);
    },
};

export default freigths;
