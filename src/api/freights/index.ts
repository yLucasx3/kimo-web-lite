import { post } from 'config/axios';
import endpoints from 'config/endpoints';

const freigths = {
    store: async (data: any, context?: any) => {
        return await post(endpoints.FREIGHTS, data, context);
    },
};

export default freigths;
