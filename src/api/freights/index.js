import { post } from 'config/axios';
import endpoints from 'config/endpoints';

const freigths = {
  store: async data => {
    return await post(endpoints.FREIGHTS, data);
  }
};

export default freigths;