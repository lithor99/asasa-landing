import handleError from '~/../server/utils/handleError';
import type { H3Event } from 'h3'; // Import H3Event from h3
export default defineEventHandler(
    handleError(async (event: H3Event) => {
        const axios = event.context.axios;

        /**
         *   query string by id
         */
        const { id } = getRouterParams(event);
        const params = getQuery(event);
        const { data } = await axios.get(`object-land/${id}`, {
            params,
        });
        return data;
    }),
);
